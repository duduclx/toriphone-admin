import { Table, useDisclosure } from "@chakra-ui/react";

import TemplateActions from "./TemplateActions";
import TemplateDelete from "./TemplateDelete";
import TemplateDetails from "./TemplateDetails";

const TemplateListContent = ({ children, onEdit, onOpen, open, onClose, title, ressource, subTitle, submit = null, record = null, recordStart = null, recordStop = null, loading = false }) => {
  // requirements
  const { open: isEyeOpen, onOpen: onEyeOpen, onClose: onEyeClose } = useDisclosure();

  return (
    <>
      <Table.Row bg="TableBodyBg">
        <TemplateActions onEdit={onEdit} onEyeOpen={onEyeOpen} onOpen={onOpen} record={record} recordStart={recordStart} recordStop={recordStop}/>
        {children}
      </Table.Row>
      {submit && (
        <TemplateDelete open={open} onClose={onClose} title={title} subTitle={subTitle} submit={submit} loading={loading}/>
      )}
      <TemplateDetails ressource={ressource} isEyeOpen={isEyeOpen} onEyeClose={onEyeClose} onEyeOpen={onEyeOpen} />
    </>
  );
};

export default TemplateListContent;
