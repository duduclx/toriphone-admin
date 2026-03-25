import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight, FaEllipsisH } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

import { useColorModeValue } from "../../components/ui/color-mode";

import { useApis } from "../../ApiProvider";

const TemplatePagination = ({items, page, handlePageChange}) => {
  // requirements
  const isDark = useColorModeValue(false, true);

  // api
  const { itemsPerPage } = useApis();

  // pagecount
  const pageCount = Math.ceil(((items.filtered ?? items.total) ?? 0) / itemsPerPage) || 1;

  return (
    <ReactPaginate
      previousLabel={<IconButton variant="ghost"><FaAngleLeft /></IconButton>}
      nextLabel={<IconButton variant="ghost"><FaAngleRight /></IconButton>}
      breakLabel={<IconButton variant="ghost"><FaEllipsisH /></IconButton>}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      pageClassName={"page-item"}
      activeClassName={isDark ? "active-dark" : "active-light"}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      breakClassName={"break-me"}
      forcePage={page}
    />
  );
};

export default TemplatePagination;
