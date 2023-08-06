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
import { useParams } from "react-router-dom";
import { Employee, Role } from "../../utils/types";
import { FaUpload } from "react-icons/fa";

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
  const { classes } = useStyles();

  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee>();

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

  const [rolesFlat, setRolesFlat] = useState<Role[]>();

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

  const onSubmit = async (data: unknown) => {
    let photo;
    if (file) photo = await convertBase64(file);
    const response = await axios.post("http://localhost:3000/employees", {
      ...data,
      photo,
    });
    alert(response);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/roles?flat=true").then((response) => {
      setRolesFlat(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:3000/employees/${id}`).then((response) => {
      setEmployee(response.data);
      console.log(response.data);
    });
  }, [id]);

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
                <Loader />
              )}
              <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    icon={<TbCalendar size="1.1rem" stroke={1.5} />}
                    label="Hire Date"
                    placeholder={employee?.hireDate}
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
                    icon={<TbCalendar size="1.1rem" stroke={1.5} />}
                    label="Birth Date"
                    placeholder={employee?.hireDate}
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
