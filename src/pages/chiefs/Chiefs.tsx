import { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import axios from "axios";
import { Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { Role } from "../../utils/types";
import Loading from "../../components/Loading";
import { API_URL } from "../../utils/config";
import { setStatus } from "../../features/Status";

function Chiefs() {
  const [ceo, setCeo] = useState<Role>();
  const [ceoChilds, setCeoChilds] = useState<Role[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/roles?depth=1`)
      .then((response) => {
        if (response.status === 200) {
          setCeo(response.data[0]);
          setCeoChilds(response.data[0].children);
          setLoading(false);
        } else {
          setStatus({
            title: "Error",
            message: `${response.data.message}`,
            type: "load",
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setStatus({
          title: "Network Error",
          message: "Check your internet connection, and try again.",
          type: "error",
        });
        setLoading(false);
      });
  }, []);

  return (
    <Box pos="relative">
      <Loading loading={loading} />
      <div className="grid justify-center mb-28 mt-20">
        {ceo && (
          <EmployeeCard
            id={ceo.employees[0]?.id}
            photo={ceo.employees[0]?.photo}
            fullName={ceo.employees[0]?.fullName}
            role={ceo.name}
          />
        )}
      </div>
      <div className="flex justify-evenly">
        {ceoChilds &&
          ceoChilds.map((child) => (
            <Link to={`/roleGroup/${child.id}`}>
              <EmployeeCard
                id={child.employees[0]?.id}
                photo={child.employees[0]?.photo}
                fullName={child.employees[0]?.fullName}
                role={child.name}
              />
            </Link>
          ))}
      </div>
    </Box>
  );
}

export default Chiefs;
