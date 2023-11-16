import { Tree } from "react-organizational-chart";
import RoleNode from "../../components/RoleNode";
import { useEffect } from "react";
import { Image, Box } from "@mantine/core";
import { logo } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../features/Roles";
import Loading from "../../components/Loading";

function RolesTree() {
  const dispatch = useDispatch();
  const root = useSelector((state) => state.roles.roles[0]);
  const loading = useSelector((state) => state.roles.loading);

  useEffect(() => {
    if (!root) {
      dispatch(fetchRoles());
    }
  }, [dispatch]);

  return (
    <Box className="mt-5" pos={"relative"}>
      <Loading loading={loading}/>
      <Tree
        label={<Image src={logo} width={150} display={"inline-block"} />}
        lineColor="lightgreen"
        lineWidth="3px"
      >
        {root && <RoleNode role={root} />}
      </Tree>
    </Box>
  );
}

export default RolesTree;
