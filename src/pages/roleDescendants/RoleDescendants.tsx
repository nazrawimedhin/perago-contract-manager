import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Popover,
  Select,
  Text,
} from "@mantine/core";
import EmployeesTable from "../../components/EmployeesTable";
import { useState, useEffect } from "react";
import axios from "axios";
import Paginate from "../../components/Paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import { CreateRole, EmployeeResults, Role } from "../../utils/types";
import Loading from "../../components/Loading";

function RoleEmployees() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [descendants, setDescendants] = useState<EmployeeResults>();
  const [role, setRole] = useState<Role>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rolesExceptChild, setRolesExceptDescendants] = useState();
  const [newParent, setNewParent] = useState<string>();

  const handleDelete = async (id: string) => {
    setLoading(true);
    const data: Pick<CreateRole, "parentId"> = {
      parentId: newParent,
    };
    await axios.delete(`http://localhost:3000/roles/${id}`, data);
    setLoading(false);
    alert("Role deleted");
    Navigate("/");
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/roles/${id}`).then((response) => {
      setRole(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/roles/${id}/employees`)
      .then((response) => {
        setDescendants(response.data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/roles/${id}/except_descendants`)
      .then((response) => {
        setRolesExceptDescendants(response.data);
      });
  }, [id]);

  return (
    <Container pos="relative">
      <Loading loading={loading} />
      <Flex className="justify-between">
        <Group>
          <Text className="my-4" c="green" fw={500} fz={24}>
            Employees Under {role?.name}
          </Text>
        </Group>
        <Group>
          <Link to={{ pathname: `/editrole/${role?.id}` }}>
            <Button variant="subtle" color="dark">
              <Text className="mr-3">Edit Role</Text>
              <AiTwotoneEdit size={25} />
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
              <Flex>
                <Button variant="subtle" className="mr-3" color="red">
                  <Text className="mr-3">Delete Role</Text>
                  <RiDeleteBinFill size={25} />
                </Button>
              </Flex>
            </Popover.Target>
            <Popover.Dropdown className="grid place-items-center">
              {role?.children.length ?? 0 > 0 ? (
                <Select
                  onChange={(value) => value && setNewParent(value)}
                  data={
                    rolesExceptChild?.map((role) => ({
                      value: role.id,
                      label: role.name,
                    })) ?? []
                  }
                  label="Select new parent role for descendants"
                  placeholder="Select Role e.g. Backend Developer"
                  dropdownComponent="div"
                />
              ) : (
                <Loader variant="bars" color="green" />
              )}
              <Text c="red" fz={14}>
                All Employees associated with this role will be deleted!
              </Text>
              <Divider my="xs" />
              <Button
                onClick={() => handleDelete(role?.id ?? "")}
                className="bg-white hover:bg-red-100"
                radius="xl"
                size="sm"
                c="red"
              >
                Confirm Delete Role
              </Button>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Flex>

      {descendants ? (
        <EmployeesTable employees={descendants.results} />
      ) : (
        <Loading loading={true} />
      )}
      <Center className="mt-2">
        <Paginate
          page={page}
          setPage={setPage}
          total={descendants?.pages ?? 10}
        />
      </Center>
    </Container>
  );
}

export default RoleEmployees;
