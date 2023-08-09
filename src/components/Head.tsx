import {
  Group,
  Button,
  Text,
  Image,
  Flex,
  Container,
  createStyles,
  MediaQuery,
  Box,
} from "@mantine/core";
import { IoAdd } from "react-icons/io5";
import { logo } from "../assets/assets";
import { Link } from "react-router-dom";
import SwitchToggle from "./SchemeToggle";

const useStyles = createStyles((theme) => ({
  button: {
    "&:hover": {
      backgroundColor: theme.colors.green[5],
    },
  },

  text: {
    color: theme.colors.green[6],
  },
}));

function Head() {
  const { classes } = useStyles();

  return (
    <Box py={16} style={{ width: "100%" }}>
      <Container>
        <Flex justify={"space-between"} className="">
          <Group className="">
            <Image src={logo} width={125} />
            <MediaQuery
              query="(max-width: 45rem)"
              styles={{
                display: "none",
              }}
            >
              <Text className={`${classes.text}`} fw={700} fz={24}>
                Contract Manager
              </Text>
            </MediaQuery>
          </Group>
          <Group>
            <Link to="/createemployee">
              <Button
                size="sm"
                className={`${classes.button} bg-green-400 rounded-full`}
                c="#165B12"
                rightIcon={<IoAdd size="1rem" />}
              >
                Add Employee
              </Button>
            </Link>
            <SwitchToggle />
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}

export default Head;
