import { Field, Tabs } from "@chakra-ui/react";
import { InputUi } from "../../../../ui";
import { useTranslation } from "react-i18next";

import IncallExtensions from "../helper/IncallExtensions";
import ContextForm from "../form/ContextForm";
import FormContainer from "../../../../templates/forms/FormContainer";

const ContextIncall = ({ context, setContext, contexts, setContexts }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Tabs.Root mt="4" defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="incall">{t("common.incall")}</Tabs.Trigger>
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

      <Tabs.Content width="50%" m="auto" value="incall">
        <IncallExtensions context={context} setContext={setContext} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ContextIncall;
