import {
  createStyles,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  rem,
  Container,
  Loader,
  Select,
  FileButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { TbCalendar } from "react-icons/tb";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Employee, Role } from "../../utils/types";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../features/Status";
import { uploadFile } from "@uploadcare/upload-client";
import { API_URL, UCARE_PUB_KEY } from "../../utils/config";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundColor: theme.colors.green[6],
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,
    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.green[6],
    },
  },
}));

export default function EditEmployee() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();
  const [file, setFile] = useState<File | null>(null);
  const [rolesFlat, setRolesFlat] = useState<Role[]>();
  const handleFile = async (file: File) => {
    setFile(file);
  };

  const EmployeeSchema = yup
    .object({
      fullName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      roleId: yup.string().required(),
      gender: yup.string().required(),
      hireDate: yup.date().required(),
      birthDate: yup.date().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(EmployeeSchema),
    values: employee && {
      ...employee,
      roleId: employee?.role?.id,
    },
  });
  type FormData = yup.InferType<typeof EmployeeSchema>;

  const onSubmit = async (data: FormData) => {
    dispatch(
      setStatus({
        title: "Loading",
        message: "Uploading data to the server",
        type: "load",
      })
    );

    let photo;
    if (file) {
      photo = await uploadFile(file, {
        publicKey: UCARE_PUB_KEY,
        store: "auto",
        metadata: {
          subsystem: "uploader",
          employee: "photo",
        },
      });
    }

    const photoUrl = photo?.cdnUrl;

    await axios
      .patch(`${API_URL}/employees`, {
        ...data,
        photo: photoUrl,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setStatus({
              title: "Success",
              message: "Employee updated successfully",
              type: "success",
            })
          );
          navigate("/employees");
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.error}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your network and try again.",
            type: "error",
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/employees/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setEmployee(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.error}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your network and try again.",
            type: "error",
          })
        );
      });
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/roles?flat=true`)
      .then((response) => {
        if (response.status === 200) {
          setRolesFlat(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.error}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your network and try again.",
            type: "error",
          })
        );
      });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className={`${classes.wrapper} mt-10`} size="md">
        <SimpleGrid
          cols={1}
          spacing={50}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <div className={`${classes.form} flex`}>
            <Container>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Full Name"
                    error={errors.fullName?.message}
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Email"
                    error={errors.email?.message}
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Phone"
                    {...field}
                    error={errors.phone?.message}
                    classNames={{
                      input: classes.input,
                      label: classes.inputLabel,
                    }}
                  />
                )}
              />
              <FileButton onChange={handleFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button
                    className={`${classes.button} mt-6 bg-green-600`}
                    {...props}
                    leftIcon={<FaUpload />}
                  >
                    Upload image
                  </Button>
                )}
              </FileButton>
            </Container>
            <Container>
              {rolesFlat ? (
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      data={rolesFlat.map((role) => ({
                        value: role.id,
                        label: role.name,
                      }))}
                      onChange={(value) => value && field.onChange(value)}
                      label="Role"
                      error={errors.roleId?.message}
                      dropdownComponent="div"
                    />
                  )}
                />
              ) : (
                <Loader variant="bars" color="green" />
              )}
              <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    icon={<TbCalendar size="1.1rem" />}
                    label="Hire Date"
                    // value={employee?.hireDate}
                    error={errors.hireDate?.message}
                    onChange={(value) => value && field.onChange(value)}
                    mx="auto"
                    maw={400}
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    data={[
                      {
                        value: "M",
                        label: "Male",
                      },
                      {
                        value: "F",
                        label: "Female",
                      },
                    ]}
                    label="Gender"
                    placeholder={employee?.gender}
                    dropdownComponent="div"
                    error={errors.gender?.message}
                  />
                )}
              />
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    icon={<TbCalendar size="1.1rem" />}
                    label="Birth Date"
                    // value={employee?.birthDate}
                    error={errors.birthDate?.message}
                    onChange={(value) => value && field.onChange(value)}
                    mx="auto"
                    maw={400}
                  />
                )}
              />
              <Group position="right" mt="md">
                <Button
                  disabled={status?.type === "load"}
                  type="submit"
                  className={`${classes.button} bg-green-600`}
                >
                  Submit
                </Button>
              </Group>
            </Container>
          </div>
        </SimpleGrid>
      </Container>
    </form>
  );
}
