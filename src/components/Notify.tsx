import { Notification, Dialog } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsCheckCircleFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

function Notify() {
  const status = useSelector((state) => state.status);
  const [opened, { close }] = useDisclosure(!status);

  if (!status) {
    return null;
  }

  const data = {
    success: { color: "green", icon: <BsCheckCircleFill size="1.2rem" /> },
    error: { color: "red", icon: <BiSolidErrorCircle size="1.2rem" /> },
    load: { color: "green" },
  };

  const { title, message, type } = status;

  return (
    <Dialog opened={opened} onClose={close} size="lg" radius="lg">
      <Notification
        my={15}
        radius="lg"
        onClose={close}
        title={title}
        loading={type === "load"}
        {...data[type]}
      >
        {message}
      </Notification>
    </Dialog>
  );
}

export default Notify;
