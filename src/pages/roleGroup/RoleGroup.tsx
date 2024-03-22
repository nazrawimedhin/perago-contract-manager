import {
  Card,
  Center,
  Container,
  Group,
  Text,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubRole from "../../components/SubRole";
import RoleCard from "../../components/RoleCard";
import { EmployeeResults, Role } from "../../utils/types";
import Loading from "../../components/Loading";
import { API_URL } from "../../utils/config";
import { setStatus } from "../../features/Status";
import { useDispatch } from "react-redux";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  },
}));

function RoleGroup() {
  const { classes } = useStyles();
  const { id } = useParams();
  const [role, setRole] = useState<Role>();
  const [loading, setLoading] = useState(false);
  const [descendants, setDescendants] = useState<EmployeeResults>();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/roles/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setRole(response.data);
          setLoading(false);
        } else {
          dispatch(
            setStatus({
              title: "Success",
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
            message: "Check your internet connection and try again",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/roles/${id}/employees`)
      .then((response) => {
        if (response.status === 200) {
          setDescendants(response.data);
          setLoading(false);
        } else {
          dispatch(
            setStatus({
              title: "Success",
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
            message: "Check your internet connection and try again",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  return (
    <Container pos={"relative"}>
      <Loading loading={loading} />
      <Group className="flex justify-between mt-7 mb-10">
        <RoleCard role={role} />
        <Card className={`${classes.card}  p-5`} radius="lg">
          <Text fw={700} fz="lg">
            {role?.children.length} Sub Roles
          </Text>
        </Card>
        <Card className={`${classes.card}  p-5`} radius="lg">
          <Text fw={700} fz="lg">
            {descendants?.results.length} total employees
          </Text>
        </Card>
      </Group>
      {role?.children.length >= 1 ? (
        role?.children.map((child) => <SubRole role={child} />)
      ) : (
        <Center>
          <Text fw={500} fz="lg">
            No Sub Roles
          </Text>
        </Center>
      )}
    </Container>
  );
}

export default RoleGroup;
