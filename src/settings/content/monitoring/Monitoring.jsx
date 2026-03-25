import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import TemplatePage from "../../templates/TemplatePage";
import MonitoringList from "./content/MonitoringList";

const Monitoring = () => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const {
    agentdStatus,
    agentdStatusGet,
    calldStatus,
    calldStatusGet,
    callLogdStatus,
    callLogdStatusGet,
    chatdStatus,
    chatdStatusGet,
    confdStatus,
    confdStatusGet,
    dirdStatus,
    dirdStatusGet,
    plugindStatus,
    plugindStatusGet,
    provdStatus,
    provdStatusGet,
    webhookdStatus,
    webhookdStatusGet,
  } = useApis();

  // values
  const [services, setServices] = useState({});

  // load
  useEffect(() => {
    agentdStatusGet();
    calldStatusGet();
    callLogdStatusGet();
    chatdStatusGet();
    confdStatusGet();
    dirdStatusGet();
    plugindStatusGet();
    provdStatusGet();
    webhookdStatusGet();
  }, []);

  // update
  useEffect(() => {
    if (agentdStatus && calldStatus && callLogdStatus && chatdStatus && confdStatus && dirdStatus && plugindStatus && provdStatus && webhookdStatus) {
      setServices({
        items: [agentdStatus, calldStatus, callLogdStatus, chatdStatus, confdStatus, dirdStatus, plugindStatus, provdStatus, webhookdStatus],
      });
    }
  }, [agentdStatus, calldStatus, callLogdStatus, chatdStatus, dirdStatus, plugindStatus, provdStatus, webhookdStatus]);

  return (
    <TemplatePage title={t("monitoring.title")} isList hasNoAdd>
      <MonitoringList items={services} />
    </TemplatePage>
  );
};

export default Monitoring;
