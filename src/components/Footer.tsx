import { Group, Text, Title } from "@mantine/core"

function Footer() {
  return (
    <Group className="bg-green-600 grid grid-cols-1 place-items-center py-10">
      <Group className=''>
        <Title className="text-white" order={3}>Perago Information Systems</Title>
      </Group>
      <Group className="pt-3">
        <Text className='text-white'>Email: info@peragosystems.com</Text>
        <Text className='text-white px-10'>Tel: +251 114 701 998 | +251 911 231 622</Text>
        <Text className='text-white'>Po.Box: 139 Addis Ababa, Ethiopia</Text>
      </Group>
    </Group>
  )
}

export default Footer
