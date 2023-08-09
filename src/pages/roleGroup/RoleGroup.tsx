import {
  Card,
  Center,
  Container,
  Group,
  Text,
  createStyles,
} from "@mantine/core";
import SubRole from "../../components/SubRole";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RoleAvatar from "../../components/RoleAvatar";
import { EmployeeResults, Role } from "../../utils/types";
import Loading from "../../components/Loading";

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

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/roles/${id}`).then((response) => {
      setRole(response.data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/roles/${id}/employees`)
      .then((response) => {
        setDescendants(response.data);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container pos={"relative"}>
      <Loading loading={loading} />
      <Group className="flex justify-between mt-7 mb-10">
        <RoleAvatar role={role} />
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
