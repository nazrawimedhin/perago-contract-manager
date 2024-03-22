import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createStyles, Navbar, getStylesRef, rem, Button } from "@mantine/core";
import { IoAdd } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { TbBinaryTree } from "react-icons/tb";
import { RiGroupFill } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.green[1],
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    marginLeft: theme.spacing.sm,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  button: {
    "&:hover": {
      backgroundColor: theme.colors.green[5],
    },
  },
}));

const data = [
  { link: "/", label: "Roles Tree", icon: TbBinaryTree },
  { link: "/employees", label: "All Employees", icon: IoIosPeople },
  { link: "/roleGroup", label: "Role Group", icon: RiGroupFill },
];

export function SideBar() {
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Role");
  const handleClick = (link: string) => {
    navigate(link);
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        handleClick(item.link);
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height={680} width={{ sm: 200 }} p="lg">
      <Navbar.Section grow>{links}</Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Link to="/createRole">
          <Button
            size="sm"
            className={`${classes.button} bg-green-400 rounded-full`}
            c="#165B12"
            rightIcon={<IoAdd size="1rem" />}
          >
            Add New Role
          </Button>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}

export default SideBar;
