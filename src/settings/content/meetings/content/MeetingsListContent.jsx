import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import { IconButtonCheckUi } from "../../../ui";

const MeetingsListContent = ({ meeting, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { meetings, setMeetings, setMeetingSelected, meetingDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await meetingDelete(meeting);
    const updatedItems = meetings.items.filter((item) => item.id !== meeting.id);
    setMeetings((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setMeetingSelected(meeting);
    setSelectedComponent("meetingEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("meetings.delete.title")}
      ressource={meeting}
      subTitle={t("meetings.delete.subTitle", { name: meeting.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{meeting.name}</Table.Cell>
      <Table.Cell>{meeting.exten}</Table.Cell>
      <Table.Cell><IconButtonCheckUi item={meeting.persistent}/></Table.Cell>
      <Table.Cell><IconButtonCheckUi item={meeting.require_authorization}/></Table.Cell>
    </TemplateListContent>
  );
};

export default MeetingsListContent;
