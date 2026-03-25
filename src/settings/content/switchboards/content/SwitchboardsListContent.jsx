import { useEffect, useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";
import DestinationDisplay from "../../../helpers/DestinationDisplay";

const SwitchboardsListContent = ({ switchboard, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { switchboards, switchboardsPageGet, itemsPerPage, setSwitchboardSelected, switchboardDelete, mohs } = useApis();

  const getUpdatedMoh = (mohName, mohs) => {
    if (mohName) {
      return {
        label: mohs.items.find((moh) => moh.name === mohName)?.label || null,
        value: mohName,
      };
    }
    return null;
  };

  const [switchboardUpdated, setSwitchboardUpdated] = useState(() => {
    return {
      queue_music_on_hold_with_label: getUpdatedMoh(switchboard.queue_music_on_hold, mohs),
      waiting_room_music_on_hold_with_label: getUpdatedMoh(switchboard.waiting_room_music_on_hold, mohs),
    };
  });

  // update moh
  useEffect(() => {
    setSwitchboardUpdated(() => {
      return {
        queue_music_on_hold_with_label: getUpdatedMoh(switchboard.queue_music_on_hold, mohs),
        waiting_room_music_on_hold_with_label: getUpdatedMoh(switchboard.waiting_room_music_on_hold, mohs),
      };
    });
  }, [switchboard]);

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await switchboardDelete(switchboard);
    /*
    const updatedItems = switchboards.items.filter((item) => item.uuid !== switchboard.uuid);
    setSwitchboards((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = switchboards.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await switchboardsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setSwitchboardSelected(switchboard);
    setSelectedComponent("switchboardEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("switchboards.delete.title")}
      ressource={switchboard}
      subTitle={t("switchboards.delete.subTitle", { name: switchboard.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{switchboard.name}</Table.Cell>
      <Table.Cell>{switchboard.incalls[0]?.extensions[0].exten || ""}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={switchboard.members.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{switchboard.members.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{switchboardUpdated.queue_music_on_hold_with_label?.label || ""}</Table.Cell>
      <Table.Cell>{switchboardUpdated.waiting_room_music_on_hold_with_label?.label || ""}</Table.Cell>
      <Table.Cell>
        <DestinationDisplay destination={switchboard.fallbacks.noanswer_destination} />
      </Table.Cell>
    </TemplateListContent>
  );
};

export default SwitchboardsListContent;
