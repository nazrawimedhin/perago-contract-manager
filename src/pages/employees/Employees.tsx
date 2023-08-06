import { Center, Container, Text } from "@mantine/core";
import EmployeesTable from "../../components/EmployeesTable";
import { useState, useEffect } from "react";
import Paginate from "../../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/Employees";
import Loading from "../../components/Loading";

function Employees() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loading = useSelector(state => state.employees.loading)
  const data = useSelector(state => state.employees.data)

  useEffect(() => {
    dispatch(fetchEmployees(page));
  }, [dispatch, page]);

  return (
    <Container pos="relative">
      <Text className="my-3" c="green" fw={500} fz={24}>
        All Employees
      </Text>
      <Loading loading={loading}/>
      {data && (
        <EmployeesTable employees={data.results} />
      ) }
      <Center className="mt-2">
        <Paginate page={page} setPage={setPage} total={data?.pages ?? 10} />
      </Center>
    </Container>
  );
}

export default Employees;
