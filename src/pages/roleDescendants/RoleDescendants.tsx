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
import { setStatus } from "../../features/Status";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/config";

function RoleEmployees() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const navigate = useNavigate();
  const { id } = useParams();
  const [descendants, setDescendants] = useState<EmployeeResults>();
  const [role, setRole] = useState<Role>();
  const [page, setPage] = useState(1);
  const [rolesExceptChild, setRolesExceptDescendants] = useState();
  const [newParent, setNewParent] = useState<string>();

  const handleDelete = async () => {
    dispatch(
      setStatus({
        title: "Loading",
        message: "Uploading data to the server",
        type: "load",
      })
    );

    const data: Pick<CreateRole, "parentId"> = {
      parentId: newParent,
    };

    await axios
      .delete(`${API_URL}/roles/${id}`, data)
      .then((response) => {
        if (response.status === 204) {
          dispatch(
            setStatus({
              title: "Success",
              message: "New employee created successfully",
              type: "success",
            })
          );
          navigate("/roles");
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/roles/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setRole(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  useEffect(() => {
    axios
      .get(`${API_URL}/roles/${id}/employees`)
      .then((response) => {
        if (response.status === 200) {
          setDescendants(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  useEffect(() => {
    axios
      .get(`${API_URL}/roles/${id}/except_descendants`)
      .then((response) => {
        if (response.status === 200) {
          setRolesExceptDescendants(response.data);
        } else {
          dispatch(
            setStatus({
              title: "Error",
              message: `${response.data.message}`,
              type: "error",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setStatus({
            title: "Error",
            message: "Check your internet connection and try again.",
            type: "error",
          })
        );
      });
  }, [id, dispatch]);

  return (
    <Container pos="relative">
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
              {role?.children.length > 0 ? (
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
              ) : role?.children.length === 0 ? (
                <></>
              ) : (
                <Loader variant="bars" color="green" />
              )}
              <Text c="red" fz={14}>
                All Employees associated with this role will be deleted!
              </Text>
              <Divider my="xs" />
              <Button
                disabled={status?.type === "load"}
                onClick={() => handleDelete()}
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
