import { Card, Group, Text } from "@mantine/core"
import Profile from "../Profile"
import GroupProfile from "../GroupProfile";

function Team() {
  const team = 'Operation'
  const subs = 3
  const employees = 18

  return (
    <div>
      <Text className="text-green-500 ml-72 pl-5 pt-8" fw={500} size={36}>{team} Team</Text>
      <Group className="flex justify-around ml-48 mt-12">
        <Profile/>
        <Card className="grid justify-items-center bg-gray-100 p-5" radius='lg'>
          <Text fw={700} fz='lg'>{subs} sub teams</Text>
        </Card>
        <Card className="grid justify-items-center bg-gray-100 p-5 mr-48" radius='lg'>
          <Text fw={700} fz='lg'>{employees} employees</Text>
        </Card>
      </Group>
      <Group className="ml-96 pl-10">
        <GroupProfile level={3}/>
      </Group>
      <Group className="ml-96 pl-10">
        <GroupProfile level={4}/>
      </Group>
      <Group className="ml-96 pl-10">
        <GroupProfile level={5}/>
      </Group>
    </div>
  )
}

export default Team
