import { Table} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplateTable from "../../../templates/TemplateTable";
import BackendsListContentLdap from "./BackendsListContentLdap";
import BackendsListContentSaml from "./BackendsListContentSaml";

const BackendsList = ({
  setSelectedComponent,
  backendLdap,
  setBackendLdap,
  backendSaml,
  setBackendSaml,
  setErrors,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <TemplateTable>
      <Table.Caption></Table.Caption>
      <Table.Header>
        <Table.Row bg="TableHeaderBg">
          <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
          <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
          <Table.ColumnHeader>{t("common.url")}</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {backendLdap && (
          <BackendsListContentLdap
            setSelectedComponent={setSelectedComponent}
            backendLdap={backendLdap}
            setBackendLdap={setBackendLdap}
            setErrors={setErrors}
          />
        )}
        {backendSaml && (
          <BackendsListContentSaml
            setSelectedComponent={setSelectedComponent}
            backendSaml={backendSaml}
            setBackendSaml={setBackendSaml}
            setErrors={setErrors}
          />
        )}
      </Table.Body>
    </TemplateTable>
  );
};

export default BackendsList;
