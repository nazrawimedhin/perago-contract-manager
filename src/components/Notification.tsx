import { Alert } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';

export default function Notification({ title, message, color }) {
  return (
    <Alert icon={<TbAlertCircle size="1rem" />} title={title} color={color}>
      {message}
    </Alert>
  );
}
