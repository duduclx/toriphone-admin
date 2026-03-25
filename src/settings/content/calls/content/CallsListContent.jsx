import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const CallsListContent = ({ call, setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { calls, setCalls, callDelete, callRecordStart, callRecordStop } = useApis();

  // value
  const [record, setRecord] = useState(call.record_state === "active" ? true : false);

  const onEdit = () => {
    //setProfileSelected(profile);
    //setSelectedComponent("profileEdit");
  };

  // submit
  const submit = async () => {
    setLoading(true);
    await callDelete(call);
    const updatedItems = calls.items.filter((item) => item.call_id !== call.call_id);
    setCalls({
      ...calls,
      items: updatedItems,
      total: updatedItems.length,
    });
    setLoading(false);
    onClose();
  };

  const recordStart = async () => {
    const res = await callRecordStart(call);
    if (res) {
      setRecord(true);
    }
    /*
    console.log('res', res)
    //SyntaxError: Unexpected end of JSON input
    if (res.status == 204) {
        // mettre à jour le call_id correspondant
        // call.record_state = "active"
        setRecord(true)
    }
        */
  };

  const recordStop = async () => {
    const res = await callRecordStop(call);
    if (res) {
      setRecord(false);
    }
    /*
    if (res.status == 204) {
        // mettre à jour le call_id correspondant
        // call.record_state = "inactive"
        setRecord(false)
    }
        */
  };

  return (
    <TemplateListContent
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      ressource={call}
      submit={submit}
      title={t("calls.delete.title")}
      subTitle={t("calls.delete.subTitle", { name: call.caller_id_name })}
      record={record}
      recordStart={recordStart}
      recordStop={recordStop}
      loading={loading}
    >
      <Table.Cell>{call.caller_id_name}</Table.Cell>
      <Table.Cell>{call.caller_id_number}</Table.Cell>
      <Table.Cell>{call.peer_caller_id_name}</Table.Cell>
      <Table.Cell>{call.peer_caller_id_number}</Table.Cell>
      <Table.Cell>{call.direction}</Table.Cell>
      <Table.Cell>{call.is_caller}</Table.Cell>
    </TemplateListContent>
  );
};

export default CallsListContent;
