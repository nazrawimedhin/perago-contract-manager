import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

export default function SwitchColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center">
      <Switch
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<BsSunFill color={theme.white} size="1.25rem" />}
        offLabel={
          <BsFillMoonStarsFill color={theme.colors.gray[6]} size="1.25rem" />
        }
      />
    </Group>
  );
}
