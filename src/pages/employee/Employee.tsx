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
import { MdPersonRemove } from "react-icons/md";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { setStatus } from "../../features/Status";

function Employee() {

  const dispatch = useDispatch()
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    dispatch(
      setStatus({ title: "Loading", message: 'Uploading data to the server', type: "load" })
    );

    await axios
      .delete(`http://localhost:3000/employees/${id}`)
      .then((response) => {
        dispatch(
          setStatus({ title: "Success", message: 'Employee deleted successfully', type: "success" })
        );
      }).catch( (error) => {
        dispatch(
          setStatus({ title: "Success", message: error.error.message, type: "success" })
        );
      }
      );
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
              <Group className="flex">
                <Link to={{ pathname: `/editEmployee/${employee.id}`}}>
                  <Button variant="subtle" color='green' rightIcon={<FaUserEdit />}>
                    Edit
                  </Button>
                </Link>
                <Popover
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  radius="xl"
                >
                  <Popover.Target>
                      <Button variant="subtle" color="red" rightIcon={<MdPersonRemove />}>
                        Delete
                      </Button>
                  </Popover.Target>
                  <Popover.Dropdown className="grid place-items-center">
                    <Button
                      className="hover:bg-red-100"
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
