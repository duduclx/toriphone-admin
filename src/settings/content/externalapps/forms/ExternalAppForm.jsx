import { useEffect, useState } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import FormContainer from "../../../templates/forms/FormContainer";
import ExternalAppWeb from "./ExternalAppWeb";
import ExternalAppMobile from "./ExternalAppMobile";
import ExternalAppPortal from "./ExternalAppPortal";
import ExternalAppSubscription from "./ExternalAppSubscription";
import ExternalAppCustom from "./ExternalAppCustom";
import ExternalAppMeetingCalendar from "./ExternalAppMeetingCalendar";

const ExternalAppForm = ({ externalapp, setExternalapp, users, setUsers, isEdit = false }) => {
  // requirements
  const { t } = useTranslation("admin");

  // value
  const [appType, setAppType] = useState(externalapp.name || "");

  // default app layout
  const appList = [
    "web",
    "mobile",
    "meetingCalendar",
    "portal",
    "subscription",
    "custom",
    //"twilio"
  ];

  // update from GroupMembersForm
  useEffect(() => {
    setExternalapp({
      ...externalapp,
      configuration: {
        ...externalapp.configuration,
        users: users,
      },
    });
  }, [users]);

  // rename default app
  useEffect(() => {
    if (appType !== "") {
      let label = "toriphone configuration";

      if (appType === "web") {
        label = "Webrtc Configuration";
      } else if (appType === "mobile") {
        label = "Mobile configuration";
      } else if (appType === "portal") {
        label = "Portal";
      } else if (appType === "subscription") {
        label = "subscription";
      } else if (appType === "meetingCalendar") {
        label = "meeting Calendar";
      }

      setExternalapp((prev) => ({
        ...prev,
        name: appType,
        label,
      }));
    }
  }, [appType]);

  return (
    <FormContainer>
      <Field.Root>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          readOnly={isEdit}
          placeholder={t("common.name")}
          value={externalapp.name}
          onChange={(e) => setExternalapp({ ...externalapp, name: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.label")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.label")}
          value={externalapp.label}
          onChange={(e) => setExternalapp({ ...externalapp, label: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.purpose")} :</Field.Label>
        <NativeSelectUi
          value={externalapp.configuration.purpose}
          onChange={(e) =>
            setExternalapp({
              ...externalapp,
              configuration: {
                ...externalapp.configuration,
                purpose: e.target.value,
              },
            })
          }
        >
          <option value="tenant">tenant</option>
          <option value="user">user</option>
        </NativeSelectUi>
      </Field.Root>
      {externalapp.configuration.purpose == "user" && (
        <GroupMembersForm groupMembers={users} setGroupMembers={setUsers} />
      )}
      <Field.Root>
        <Field.Label>{t("external_apps.app")} :</Field.Label>
        <NativeSelectUi value={appType} onChange={(e) => setAppType(e.target.value)}>
          <option>{t("external_apps.app_select")}</option>
          {appList.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </NativeSelectUi>
        <Field.HelperText>{t("external_apps.app_helper")}</Field.HelperText>
      </Field.Root>
      {appType === "web" && <ExternalAppWeb externalapp={externalapp} setExternalapp={setExternalapp} />}
      {appType === "mobile" && <ExternalAppMobile externalapp={externalapp} setExternalapp={setExternalapp} />}
      {appType === "portal" && <ExternalAppPortal externalapp={externalapp} setExternalapp={setExternalapp} />}
      {appType === "subscription" && (
        <ExternalAppSubscription externalapp={externalapp} setExternalapp={setExternalapp} />
      )}
      {appType === "custom" && <ExternalAppCustom externalapp={externalapp} setExternalapp={setExternalapp} />}
      {appType === "meetingCalendar" && (
        <ExternalAppMeetingCalendar externalapp={externalapp} setExternalapp={setExternalapp} />
      )}
    </FormContainer>
  );
};

export default ExternalAppForm;
