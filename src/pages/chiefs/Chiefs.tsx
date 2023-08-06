import { useEffect, useState } from "react";
import EmployeeAvatar from "../../components/EmployeeAvatar";
import axios from "axios";
import { Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { Role } from "../../utils/types";
import Loading from "../../components/Loading";

function Chiefs() {
  const [ceo, setCeo] = useState<Role>();
  const [ceoChilds, setCeoChilds] = useState<Role[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/roles?depth=1").then((response) => {
      setCeo(response.data[0]);
      setCeoChilds(response.data[0].children);
      setLoading(false);
    });
  }, []);

  return (
    <Box pos="relative">
      <Loading loading={loading}/>
      <div className="grid justify-center mb-28 mt-20">
        {ceo && (
          <EmployeeAvatar
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
              <EmployeeAvatar
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
