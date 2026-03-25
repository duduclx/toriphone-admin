import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TemplateTableEmpty = ({colSpan}) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Table.Row bg="TableBodyBg">
      <Table.Cell colSpan={colSpan} textAlign="center">
        {t("common.no_result")}
      </Table.Cell>
    </Table.Row>
  );
};

export default TemplateTableEmpty;
