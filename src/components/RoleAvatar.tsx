import {
  Avatar,
  Badge,
  Card,
  Center,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

function RoleAvatar({ role }) {
  const theme = useMantineTheme();
  let content;

  if (role?.employees?.length > 1) {
    content = (
      <Avatar.Group className="my-3" spacing="lg">
        <Avatar src={role?.employees[0].photo} radius="xl" />
        <Avatar src={role?.employees[1].photo} radius="xl" />
        {role?.employees[2]?.photo && (
          <Avatar src={role?.employees[2]?.photo} radius="xl" />
        )}
        {role?.employees?.length > 3 && (
          <Avatar radius="xl">+{role?.employees?.length - 3}</Avatar>
        )}
      </Avatar.Group>
    );
  } else if (role?.employees?.length === 1) {
    content = (
      <Avatar
        className="my-3 mx-3"
        src={role?.employees[0]?.photo}
        radius="xl"
      />
    );
  } else {
    content = <Badge color="yellow">Vacant Role</Badge>;
  }
  return (
    <Card
      style={{
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      }}
      className="px-8"
      radius="lg"
      display="inline-block"
    >
      <Link to={`/roleDescendants/${role?.id}`}>
        <Center className="grid place-items-center">
          {content}
          <Text fw={500}>{role?.name}</Text>
        </Center>
      </Link>
    </Card>
  );
}

export default RoleAvatar;
