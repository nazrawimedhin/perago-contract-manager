import { LoadingOverlay } from '@mantine/core';

export default function Loading({ loading }) {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'xl', color: 'green', variant: 'bars' }}
      overlayOpacity={0.3}
      overlayBlur={1}
    //   overlayColor="#c5c5c5"
      visible={loading}
    />
  );
}
