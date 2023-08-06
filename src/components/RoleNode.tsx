import { TreeNode } from "react-organizational-chart";
import RoleAvatar from "./RoleAvatar";

export default function RoleNode({ role }) {
  return (
    <TreeNode label={<RoleAvatar role={role} />}>
      {role.children?.map((role, index) => (
        <RoleNode role={role} key={index}/>
      ))}
    </TreeNode>
  );
}
