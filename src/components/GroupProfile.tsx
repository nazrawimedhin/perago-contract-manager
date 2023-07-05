import { Avatar, Card, Group, Text } from "@mantine/core";
import profile from "../assets/ceo.jpg";

function GroupProfile({ level = 4}) {
  const fullname = "James Kwanza";
  const role = "Product Manager";
  const employees = 18;

  return (
    <Card className={`flex justify-evenly bg-gray-100 mt-16 ${
      level === 3 ? 'ml-40' : (level == 4 ? 'ml-56' : (level == 5 ? 'ml-72 mr-64' : ''))
    }`}  radius="lg">
      <Group>
        <Avatar
          src={profile}
          size={40}
          radius="xl"
          alt="profile"
        />
        <Text fw={500} fz="md">
          {fullname}
        </Text>
      </Group>
      <Group className="flex justify-between">
        <Text className={`${
      level === 3 ? 'ml-24 mr-20' : (level == 4 ? 'ml-16 mr-16' : (level == 5 ? 'ml-12 mr-8' : ''))
    }`} fw={500} fz="md">
          {role}
        </Text>
        <Avatar.Group className={`${level === 3 ? 'pr-16' : (level === 4) ? 'pr-12' : (level === 5) ? 'pr-8' : ''}`} spacing="sm">
          <Avatar src={profile} radius="xl" size={28}/>
          <Avatar src={profile} radius="xl" size={28}/>
          <Avatar src={profile} radius="xl" size={28}/>
          <Avatar radius="xl" size={28}>
            +{employees - 3}
          </Avatar>
        </Avatar.Group>
      </Group>
    </Card>
  );
}

export default GroupProfile;
