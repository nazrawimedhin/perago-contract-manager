import { Pagination } from '@mantine/core';

interface Props {
  page: number,
  setPage: (page: number) => void,
  total: number
}

function Paginate({page, setPage, total}: Props) {

  return <Pagination color='green' value={page} onChange={setPage} total={total} siblings={1} />
}

export default Paginate
