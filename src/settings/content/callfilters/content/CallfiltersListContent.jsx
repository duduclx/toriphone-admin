import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import CallfilterHelper from "../helpers/CallfilterHelper";
import TemplateListContent from "../../../templates/TemplateListContent";

import DestinationDisplay from "../../../helpers/DestinationDisplay";

const CallfiltersListContent = ({ callfilter, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();
  const { getStrategyLabel } = CallfilterHelper();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { callfilters, callfiltersPageGet, itemsPerPage, setCallfilterSelected, callfilterDelete } = useApis();

  const handleDelete = async () => {
    setLoading(true);
    await callfilterDelete(callfilter);
    /*
    const updatedItems = callfilters.items.filter((item) => item.id !== callfilter.id);
    setCallfilters((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = callfilters.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await callfiltersPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setCallfilterSelected(callfilter);
    setSelectedComponent("callfilterEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("callfilters.delete.title")}
      ressource={callfilter}
      subTitle={t("callfilters.delete.subTitle", { name: callfilter.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{callfilter.name}</Table.Cell>
      <Table.Cell>{getStrategyLabel(callfilter.strategy)}</Table.Cell>
      <Table.Cell>{callfilter.description}</Table.Cell>
      <Table.Cell>
        {callfilter.recipients.users[0]?.firstname} {callfilter.recipients.users[0]?.lastname}
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={callfilter.surrogates.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{callfilter.surrogates.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <DestinationDisplay destination={callfilter.fallbacks.noanswer_destination} />
      </Table.Cell>
    </TemplateListContent>
  );
};

export default CallfiltersListContent;
