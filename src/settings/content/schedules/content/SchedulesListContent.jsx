import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "../../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

import DestinationDisplay from "../../../helpers/DestinationDisplay";

const SchedulesListContent = ({ schedule, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { schedules, schedulePageGet, itemsPerPage, setScheduleSelected, scheduleDelete } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await scheduleDelete(schedule);
    /*
    const updatedItems = schedules.items.filter((item) => item.id !== schedule.id);
    setSchedules({
      ...schedules,
      items: updatedItems,
      total: updatedItems.length,
    });
    */
    const newTotal = schedules.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await schedulePageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setScheduleSelected(schedule);
    setSelectedComponent("scheduleEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("schedules.delete.title")}
      ressource={schedule}
      subTitle={t("schedules.delete.subTitle", { name: schedule.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{schedule.name}</Table.Cell>
      <Table.Cell>{schedule.timezone}</Table.Cell>
      <Table.Cell>
        <DestinationDisplay destination={schedule.closed_destination} />
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={schedule.groups.map((group, index) => (
            <div key={index}>{group.name}</div>
          ))}
          aria-label="Group Names"
        >
          <span>{schedule.groups.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={schedule.queues.map((queue, index) => (
            <div key={index}>{queue.name}</div>
          ))}
          aria-label="Queue Names"
        >
          <span>{schedule.queues.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={schedule.users.map((user, index) => (
            <div key={index}>
              {user.firstname} {user.lastname}
            </div>
          ))}
          aria-label="user Names"
        >
          <span>{schedule.users.length}</span>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{schedule.incalls.length}</Table.Cell>
      <Table.Cell>
        <Tooltip
          content={schedule.outcalls.map((outcall, index) => (
            <div key={index}>{outcall.name}</div>
          ))}
          aria-label="outcall Names"
        >
          <span>{schedule.outcalls.length}</span>
        </Tooltip>
      </Table.Cell>
    </TemplateListContent>
  );
};

export default SchedulesListContent;
