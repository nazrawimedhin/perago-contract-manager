import { Avatar, Center, Group, Table, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Employee } from "../utils/types";

interface Props {
  employees: Employee[];
}

function EmployeesTable({ employees }: Props) {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const rows = employees?.map((employee) => (
    <tr
      className="cursor-pointer"
      key={employee?.id}
      onClick={() => handleRowClick(employee.id)}
    >
      <td>
        <Group>
          <Avatar src={employee.photo} size={35} radius="xl" alt="profile" />
          <td>
            <Text fz={16} fw={500}>
              {employee.fullName}
            </Text>
          </td>
        </Group>
      </td>
      <td>
        <Text fz={16}>{employee?.role.name}</Text>
      </td>
      <td>
        <Text fz={16}>{employee?.role.reportsTo?.name}</Text>
      </td>
    </tr>
  ));

  return (
    <>
      {employees.length === 0 ? (
        <Center>
          <Text fz="xl" fw={700}>
            No employees
          </Text>
        </Center>
      ) : (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>
                <Text fz={20}>Name</Text>
              </th>
              <th>
                <Text fz={20}>Role</Text>
              </th>
              <th>
                <Text fz={20}>Reports To</Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </>
  );
}

export default EmployeesTable;
