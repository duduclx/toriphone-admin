import { Field } from "@chakra-ui/react";
import { InputUi } from "../../../../ui";
import { useTranslation } from "react-i18next";

import ContextForm from "../form/ContextForm";

const ContextOutcall = ({ context, setContext, contexts, setContexts }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <>
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
    </>
  );
};

export default ContextOutcall;
