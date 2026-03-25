import { Table, IconButton, Box } from "@chakra-ui/react";
import { FaPen, FaEye, FaSave } from "react-icons/fa";

import { IconButtonTrashUi } from "../ui";

const TemplateActions = ({ onEyeOpen, onOpen, onEdit, record, recordStart, recordStop }) => {
  return (
    <Table.Cell width="160px">
      <Box as="span">
        <IconButton colorPalette="primary" variant="ghost" onClick={onEyeOpen}>
          <FaEye />
        </IconButton>
        {onEdit && (
          <IconButton colorPalette="success" variant="ghost" onClick={onEdit}>
            <FaPen />
          </IconButton>
        )}
        {onOpen && <IconButtonTrashUi onClick={onOpen} />}
        {record === true ? (
          <IconButton colorPalette="danger" variant="ghost" onClick={recordStop}>
            <FaSave />
          </IconButton>
        ) : record === false ? (
          <IconButton colorPalette="success" variant="ghost" onClick={recordStart}>
            <FaSave />
          </IconButton>
        ) : null}
      </Box>
    </Table.Cell>
  );
};

export default TemplateActions;
