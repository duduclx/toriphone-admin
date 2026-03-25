import { useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import ProfilesListContent from "./ProfilesListContent";
import TemplateTable from "../../../templates/TemplateTable";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const ProfilesList = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { profiles, profilesGet } = useApis();

  useEffect(() => {
    profilesGet();
  }, []);

  return (
    <>
      {profiles?.items && (
        <TemplateTable>
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {profiles.items.length == 0 ? (
              <TemplateTableEmpty colSpan="2"/>
            ) : (
              profiles.items.map((profile, index) => (
                <ProfilesListContent profile={profile} key={index} setSelectedComponent={setSelectedComponent} />
              ))
            )}
          </Table.Body>
        </TemplateTable>
      )}
    </>
  );
};

export default ProfilesList;
