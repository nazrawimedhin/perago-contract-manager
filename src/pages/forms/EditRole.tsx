import {
  createStyles,
  TextInput,
  Textarea,
  Button,
  Group,
  rem,
  Container,
  Loader,
  Select,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { CreateRole, Role } from "../../utils/types";
import { setStatus } from "../../features/Status";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/config";

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

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.green[6],
    },
  },
}));

export default function EditRole() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { classes } = useStyles();
  const [rolesExceptDescendants, setRolesExceptDescendants] =
    useState<Role[]>();
  const [role, setRole] = useState<Role>();

  const RoleSchema = yup
    .object({
      name: yup.string().required(),
      parentId: yup.string().optional(),
      description: yup.string().optional(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(RoleSchema),
    values: role && {
      ...role,
      parentId: role?.id ?? "",
    },
  });
  type FormData = yup.InferType<typeof RoleSchema>;

  const onSubmit = async (data: CreateRole) => {
    dispatch(
      setStatus({
        title: "Loading",
        message: "Uploading data to the server",
        type: "load",
      })
    );

    await axios
      .patch(`${API_URL}/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setStatus({
              title: "Success",
              message: "Role Created successfully",
              type: "success",
            })
          );
          navigate("/roles");
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "success",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/roles/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setRole(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  useEffect(() => {
    axios
      .get(`${API_URL}/roles/${id}/except_descendants`)
      .then((response) => {
        if (response.status === 200) {
          setRolesExceptDescendants(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Network Error",
            message: "Check you internet connection and try again.",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className={`${classes.wrapper} mt-10`} size="xs">
        <Container className={classes.form}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Role Name"
                placeholder="e.g. Product Manager"
                error={errors.name?.message}
                classNames={{
                  input: classes.input,
                  label: classes.inputLabel,
                }}
              />
            )}
          />
          <>
            {rolesExceptDescendants ? (
              <Controller
                name="parentId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    data={rolesExceptDescendants.map((role) => ({
                      value: role.id,
                      label: role.name,
                    }))}
                    onChange={(value) => value && field.onChange(value)}
                    label="Parent Role"
                    placeholder="Select Role e.g. Backend Developer"
                    error={errors.parentId?.message}
                    dropdownComponent="div"
                  />
                )}
              />
            ) : (
              <Loader variant="bars" color="green" />
            )}
          </>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Role Description"
                placeholder="e.g. Technical Manager is responsible for ..."
                error={errors.description?.message}
                classNames={{
                  input: classes.input,
                  label: classes.inputLabel,
                }}
                minRows={6}
              />
            )}
          />
          <Group position="right" mt="md">
            <Button
              disabled={status?.type === "load"}
              type="submit"
              className={`${classes.button} bg-green-600`}
            >
              Update Role
            </Button>
          </Group>
        </Container>
      </Container>
    </form>
  );
}
