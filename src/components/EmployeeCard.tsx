import { Avatar, Card, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  photo: string;
  fullName: string;
  role: string;
}

function EmployeeCard({ id, photo, fullName, role }: Props) {
  const theme = useMantineTheme();

  return (
    <Card
      style={{
        background:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
      }}
      className="grid justify-items-center bg-gray-100 px-7"
      radius="lg"
    >
      <Link to={`/employees/${id}`}>
        <Avatar
          src={photo}
          className="mb-3"
          size={50}
          radius="xl"
          alt="EmployeeAvatar"
        />
      </Link>
      <Text fw={500} fz="md">
        {fullName}
      </Text>
      <Text fz="sm">{role}</Text>
    </Card>
  );
}

export default EmployeeCard;
