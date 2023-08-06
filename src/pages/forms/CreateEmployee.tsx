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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { TbCalendar } from "react-icons/tb";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetchRolesFlat from "../../features/RolesFlat";
import Loading from "../../components/Loading";
import axios from "axios"

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

  const { classes } = useStyles();

  const [file, setFile] = useState<File | null>(null);

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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

  const onSubmit = async (data: unknown) => {
    let photo;
    if (file) photo = await convertBase64(file);
    const response = await axios.post("http://localhost:3000/employees", {
      ...data,
      photo,
    });
    alert(response);
  };

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rolesFlat.loading);
  const rolesFlat = useSelector((state) => state.rolesFlat.RolesFlat);

  useEffect(() => {
    dispatch(fetchRolesFlat);
  }, [dispatch]);

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
              ) : 
                <Loading loading={loading} />
              }
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
