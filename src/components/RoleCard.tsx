import { Card, Center, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import RoleAvatar from "./RoleAvatar";

function RoleCard({ role }) {
  const theme = useMantineTheme();

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
          <RoleAvatar role={role} />
          <Text fw={500}>{role?.name}</Text>
        </Center>
      </Link>
    </Card>
  );
}

export default RoleCard;
