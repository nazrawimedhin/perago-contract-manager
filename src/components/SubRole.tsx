import { Avatar, Badge, Card, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

function SubRole({ role }) {
  const theme = useMantineTheme();

  let content;

  if (role?.employees?.length > 0) {
    content = (
      <Avatar.Group spacing="sm">
        {role.employees.slice(0, 3).map((employee) => (
          <Avatar src={employee.photo} radius="xl" size={28} />
        ))}
        {role?.employees?.length > 3 && (
          <Avatar radius="xl" size={28}>
            +{role?.employees?.length - 3}
          </Avatar>
        )}
      </Avatar.Group>
    );
  } else {
    content = (
      <Badge fw={500} fz="md">
        Vacant Role
      </Badge>
    );
  }

  return (
    <Link to={`/roleGroup/${role.id}`}>
      <Card
        style={{
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        }}
        className="flex justify-around bg-gray-100 mt-6"
        radius="lg"
      >
        <Text fw={500} fz="md">
          {role?.name}
        </Text>
        <Text fw={500} fz="md">
          {role?.children.length} Sub Roles
        </Text>
        {content}
      </Card>
    </Link>
  );
}

export default SubRole;
