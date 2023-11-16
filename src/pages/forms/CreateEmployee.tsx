import {
  createStyles,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  rem,
  Container,
  Select,
  FileButton,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { TbCalendar } from "react-icons/tb";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { uploadFile } from "@uploadcare/upload-client";
import { setStatus } from "../../features/Status";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.green[6],
    },
  },
}));

export default function CreateEmployee() {

  const Navigate = useNavigate();
  const [rolesFlat, setRolesFlat] = useState();
  const { classes } = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  const handleFile = async (file: File) => {
    setFile(file);
  };

  const EmployeeSchema = yup
    .object({
      fullName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      roleId: yup.string().uuid().required(),
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
  });
  type FormData = yup.InferType<typeof EmployeeSchema>;

  const onSubmit = async (data: FormData) => {

    dispatch(
      setStatus({ title: "Loading", message: 'Uploading data to the server', type: "load" })
    );

    let photo;
    if (file) {
      photo = await uploadFile(file, {
        publicKey: "9a12ffff4c40ae9f57ef",
        store: "auto",
        metadata: {
          subsystem: "uploader",
          employee: "photo",
        },
      });
    }

    const photoUrl = photo?.cdnUrl;

    await axios
      .post("http://localhost:3000/employees", {
        ...data,
        photo: photoUrl,
      })
      .then(() => {
        dispatch(
          setStatus({ title: "Success", message: 'New employee created successfully', type: "success" })
        );
        Navigate('/employees')
      })
      .catch((error) => {
        dispatch(
          setStatus({ title: "Error", message: error.message, type: "error" })
        );
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/roles?flat=true").then((response) => {
      setRolesFlat(response.data);
    });
  }, []);

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
                    placeholder="John Doe"
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
                    placeholder="Johndoe@example.com"
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
                    placeholder="+251912786802"
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
                      onChange={(value) => value && field.onChange(value)}
                      data={rolesFlat.map(
                        (role: { id: unknown; name: string }) => ({
                          value: role.id,
                          label: role.name,
                        })
                      )}
                      label="Role"
                      placeholder="Select Role e.g. Backend Developer"
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
                    icon={<TbCalendar size="1.1rem" stroke={1.5} />}
                    label="Hire Date"
                    placeholder="Hire Date"
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
                    onChange={(value) => value && field.onChange(value)}
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
                    placeholder="Male"
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
                    icon={<TbCalendar size="1.1rem" stroke={1.5} />}
                    label="Birth Date"
                    placeholder="Pick Birth Date"
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
