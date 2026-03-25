import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ContextsListContent = ({ context, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { contexts, setContexts, setContextSelected, contextDelete } = useApis();

  // submit
  const submit = async () => {
    setLoading(true);
    await contextDelete(context);
    const updatedItems = contexts.items.filter((item) => item.id !== context.id);
    setContexts((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setContextSelected(context);
    setSelectedComponent("contextEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("contexts.delete.title")}
      ressource={context}
      subTitle={t("contexts.delete.subTitle", { name: context.label })}
      submit={submit}
      loading={loading}
    >
      <Table.Cell>{context.label}</Table.Cell>
      <Table.Cell>{context.description}</Table.Cell>
      <Table.Cell>{context.type}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={context.contexts.map((item, index) => (
            <div key={index}>{item.label}</div>
          ))}
          aria-label="user Names"
        >
          <span>{context.contexts.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default ContextsListContent;
