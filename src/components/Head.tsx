import { IoAlertCircle, IoSearch, IoAdd } from "react-icons/io5";
import {
  Image,
  Header,
  Group,
  Input,
  Tooltip,
  Title,
  Text,
  Button,
} from "@mantine/core";
import logo from "../assets/logo.png";

function Head() {
  return (
    <Header height={180} mb={110}>
      <Group className="grid-cols-2 py-10 pl-96">
        <Image src={logo} width={160} height={40} />
        <Title order={1} weight={550}>
          Information Systems Contract Manager
        </Title>
      </Group>
      <Group className="px-36 flex justify-between">
        <Text className="text-green-500 ml-20" fw={500} fz={28}>
          Current Employees
        </Text>
        <Group className="grid-cols-2">
          <Input
            className=""
            icon={<IoSearch size="1rem" />}
            placeholder="Search"
            radius={50}
            rightSection={
              <Tooltip
                label="You can search employees from all teams here"
                position="top-end"
                withArrow
              >
                <div>
                  <IoAlertCircle
                    size="1rem"
                    style={{ display: "block", opacity: 0.5 }}
                  />
                </div>
              </Tooltip>
            }
          />
          <Button
            className="bg-green-400 rounded-full mr-24"
            c="#165B12"
            rightIcon={<IoAdd size="1rem" />}
          >
            Add
          </Button>
        </Group>
      </Group>
    </Header>
  );
}

export default Head;
