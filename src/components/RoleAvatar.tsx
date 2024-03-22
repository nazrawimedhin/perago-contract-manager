import { Avatar, Badge } from "@mantine/core";

function RoleAvatar({ role }) {
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
  return <div>{content}</div>;
}

export default RoleAvatar;
