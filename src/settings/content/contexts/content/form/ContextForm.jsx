import { useState, useEffect } from "react";
import { Field } from "@chakra-ui/react";
import ReactSelectUi from "../../../../ui/ReactSelectUi";

import { useTranslation } from "react-i18next";

import { useApis } from "../../../../../ApiProvider";

const ContextForm = ({ contextsInContext, setContextsIncontext }) => {
    // requirements
    const { t } = useTranslation("admin");

    // api
    const { contexts } = useApis()

    // State for transformed contexts
    const [transformedContexts, setTransformedContexts] = useState([]);

    useEffect(() => {
        if (contexts.items) {
            const transformed = contexts.items.map(item => ({
                value: item.id,
                label: item.label,
                id: item.id
            }));
            setTransformedContexts(transformed);
        }
    }, [contexts]);

    // on change
    const handleChange = (selected) => {
        if (selected === null) {
            setContextsIncontext([]);
        } else {
            setContextsIncontext(selected);
        }
    }

  return (
    <Field.Root>
      <Field.Label>{t("contexts.context_form_title")} :</Field.Label>
      <ReactSelectUi
        isMulti
        name="contexts"
        options={transformedContexts}
        value={contextsInContext}
        onChange={handleChange}
        placeholder={t("contexts.context_form_select")}
      />
    </Field.Root>
  )
}

export default ContextForm