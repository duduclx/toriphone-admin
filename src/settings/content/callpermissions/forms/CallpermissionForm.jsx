import { Field, Tabs } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { InputUi, ReactSelectUi } from "../../../ui";

import CallpermissionExtensions from "./CallpermissionExtensions";
import FormContainer from "../../../templates/forms/FormContainer";

const CallpermissionForm = ({ callpermission, setCallpermission }) => {
  // requirements
  const { t } = useTranslation("admin");

  const items = [
    { value: "allow", label: t("common.allow") },
    { value: "deny", label: t("common.deny") },
  ];

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="extensions">{t("common.extensions")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={callpermission.name}
              onChange={(e) => setCallpermission({ ...callpermission, name: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.password")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.password")}
              value={callpermission.password}
              onChange={(e) => setCallpermission({ ...callpermission, password: e.target.value })}
            />
            <Field.HelperText>{t("callpermissions.password_help")}</Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.mode")} :</Field.Label>
            <ReactSelectUi
              name="mode"
              options={items}
              value={items.find((item) => item.value === callpermission.mode) || null}
              onChange={(selected) => setCallpermission({ ...callpermission, mode: selected?.value })}
            />
            {/*
                <NativeSelectUi
                  value={callpermission.mode}
                  onChange={(e) => setCallpermission({ ...callpermission, mode: e.target.value })}
                >
                  {items.map((item, index) => (
                    <option value={item.value} key={index}>{item.label}</option>
                  ))}
                </NativeSelectUi>
              */}
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="extensions">
        <FormContainer alignSelf="center" justifyContent="center">
          <CallpermissionExtensions callpermission={callpermission} setCallpermission={setCallpermission} />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default CallpermissionForm;
