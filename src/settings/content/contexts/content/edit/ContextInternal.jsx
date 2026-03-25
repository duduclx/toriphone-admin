import { Field, Tabs } from "@chakra-ui/react";
import { InputUi } from "../../../../ui";
import { useTranslation } from "react-i18next";

import ContextForm from "../form/ContextForm";
import InternalExtensions from "../helper/InternalExtensions";
import FormContainer from "../../../../templates/forms/FormContainer";

const ContextInternal = ({ context, setContext, contexts, setContexts }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root mt="4" defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="conference">{t("common.conference")}</Tabs.Trigger>
        <Tabs.Trigger value="group">{t("common.group")}</Tabs.Trigger>
        <Tabs.Trigger value="queue">{t("common.queue")}</Tabs.Trigger>
        <Tabs.Trigger value="user">{t("common.user")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={context.label}
              onChange={(e) => setContext({ ...context, label: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.description")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.description")}
              value={context.description}
              onChange={(e) => setContext({ ...context, description: e.target.value })}
            />
          </Field.Root>
          <ContextForm contextsInContext={contexts} setContextsIncontext={setContexts} />
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="conference">
        <InternalExtensions context={context} setContext={setContext} rangeType="conference_room_ranges" />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="group">
        <InternalExtensions context={context} setContext={setContext} rangeType="group_ranges" />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="queue">
        <InternalExtensions context={context} setContext={setContext} rangeType="queue_ranges" />
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="user">
        <InternalExtensions context={context} setContext={setContext} rangeType="user_ranges" />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ContextInternal;
