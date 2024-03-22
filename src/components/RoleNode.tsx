import { TreeNode } from "react-organizational-chart";
import RoleCard from "./RoleCard";

export default function RoleNode({ role }) {
  return (
    <TreeNode label={<RoleCard role={role} />}>
      {role.children?.map((role, index) => (
        <RoleNode role={role} key={index} />
      ))}
    </TreeNode>
  );
}
