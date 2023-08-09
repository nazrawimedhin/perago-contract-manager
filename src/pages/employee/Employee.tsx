import {
  Avatar,
  Button,
  Card,
  Container,
  Group,
  Popover,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import Loading from "../../components/Loading";

function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/employees/${id}`)
      .then((response) => {
        alert(response.data);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/employees/${id}`).then((response) => {
      setEmployee(response.data);
    });
    setLoading(false);
  }, [id]);

  return (
    <Container className="flex mt-10" pos={"relative"}>
      <Loading loading={loading} />
      {employee && (
        <Card className="flex bg-gray-100" radius="xl">
          <Container className="grid place-items-center mr-5">
            <Avatar src={employee.photo} radius="100%" size={80} />
            <Group className="grid place-items-center mt-2">
              <Text fz={28} fw={500}>
                {employee.fullName}
              </Text>
              <Text>{employee.email}</Text>
              <Text>{employee.phone}</Text>
              <Text>{employee.hireDate}</Text>
              <Text>{employee.birthDate}</Text>
              <Text>{employee.gender}</Text>
              <Group>
                <Link to={{ pathname: `/editEmployee/${employee.id}` }}>
                  <FaUserEdit size={25} className="mr-4" />
                </Link>
                <Popover
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  radius="xl"
                >
                  <Popover.Target>
                    <TiUserDelete size={25} />
                  </Popover.Target>
                  <Popover.Dropdown className="grid place-items-center">
                    <Button
                      onClick={() => handleDelete(employee.id)}
                      size="sm"
                      c="red"
                    >
                      Fire This Employee
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            </Group>
          </Container>
          <Card radius="xl">
            <Text className="mb-3" fz={18}>
              <Text fw={500} fz={22} span c="green" inherit>
                Role:
              </Text>{" "}
              {employee.role.name}
            </Text>
            <Text className="mb-3" fz={18}>
              <Text fw={500} fz={22} span c="green" inherit>
                Reports to:
              </Text>{" "}
              {employee.role.reportsTo?.name}
            </Text>
            <Text className="mb-3" fz={18}>
              <Text fw={500} fz={22} span c="green" inherit>
                Role Description:
              </Text>{" "}
              {employee.role.description}
            </Text>
          </Card>
        </Card>
      )}
    </Container>
  );
}

export default Employee;
