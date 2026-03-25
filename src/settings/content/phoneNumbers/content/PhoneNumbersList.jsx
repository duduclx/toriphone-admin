import { Table} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";
import PhoneNumbersListContent from "./PhoneNumbersListContent";

const PhoneNumbersList = ({ setSelectedComponent, phoneNumbers, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
      {phoneNumbers?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.caller_id")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.number")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("phoneNumbers.main")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("phoneNumbers.shared")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {phoneNumbers.items.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              phoneNumbers.items.map((phoneNumber, index) => (
                <PhoneNumbersListContent phoneNumber={phoneNumber} key={index} setSelectedComponent={setSelectedComponent} page={page} setPage={setPage} search={search}/>
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
}

export default PhoneNumbersList
