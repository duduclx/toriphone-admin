import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import { IconButtonCheckUi } from "../../../ui";

const ApplicationsListContent = ({ application, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { applications, applicationsPageGet, itemsPerPage, setApplicationSelected, applicationDelete, mohs } =
    useApis();

  let updatedMoh = mohs.items.find((moh) => moh.name === application.destination_options.music_on_hold)?.label || null;

  const handleDelete = async () => {
    setLoading(true);
    await applicationDelete(application);
    /*
    const updatedItems = applications.items.filter((item) => item.uuid !== application.uuid);
    setApplications({
      ...applications,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    const newTotal = applications.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await applicationsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setApplicationSelected(application);
    setSelectedComponent("applicationEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("applications.delete.title")}
      ressource={application}
      subTitle={t("applications.delete.subTitle", { name: application.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{application.name}</Table.Cell>
      <Table.Cell>{application.destination}</Table.Cell>
      <Table.Cell>{application.destination_options.type || ""}</Table.Cell>
      <Table.Cell>{updatedMoh || ""}</Table.Cell>
      <Table.Cell>
        <IconButtonCheckUi item={application.destination_options.answer} />
      </Table.Cell>
    </TemplateListContent>
  );
};

export default ApplicationsListContent;
