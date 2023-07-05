import { Avatar, Card, Text } from "@mantine/core";
import profile from "../assets/ceo.jpg";

function Profile() {
  const fullname = "James Smith";
  const position = "CEO";

  return (
    <Card
      className="grid justify-items-center bg-gray-100 px-8"
      radius="lg"
    >
      <Avatar
        src={profile}
        className="mb-3"
        size={50}
        radius="xl"
        alt="profile"
      />
      <Text fw={500} fz="md">
        {fullname}
      </Text>
      <Text fz="sm">{position}</Text>
    </Card>
  );
}

export default Profile;
