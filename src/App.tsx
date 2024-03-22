import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Root from "./pages/root/Root";
import Chiefs from "./pages/chiefs/Chiefs";
import Employees from "./pages/employees/Employees";
import CreateRole from "./pages/forms/CreateRole";
import CreateEmployee from "./pages/forms/CreateEmployee";
import EachEmployee from "./pages/employee/Employee";
import RolesTree from "./pages/rolesTree/RolesTree";
import EditEmployee from "./pages/forms/EditEmployee";
import RoleGroup from "./pages/roleGroup/RoleGroup";
import EditRole from "./pages/forms/EditRole";
import RoleDescendants from "./pages/roleDescendants/RoleDescendants";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <RolesTree />,
        },
        {
          path: "/roleGroup",
          element: <Chiefs />,
        },
        {
          path: "/roleGroup/:id",
          element: <RoleGroup />,
        },
        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/employees/:id",
          element: <EachEmployee />,
        },
        {
          path: "/createRole",
          element: <CreateRole />,
        },
        {
          path: "/editRole/:id",
          element: <EditRole />,
        },
        {
          path: "/createEmployee",
          element: <CreateEmployee />,
        },
        {
          path: "/editEmployee/:id",
          element: <EditEmployee />,
        },
        {
          path: "/roleDescendants/:id",
          element: <RoleDescendants />,
        },
      ],
    },
  ]);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
