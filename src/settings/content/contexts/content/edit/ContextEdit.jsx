import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../../ApiProvider";

import ContextInternal from "./ContextInternal";
import ContextIncall from "./ContextIncall";
import ContextOutcall from "./ContextOutcall";

import TemplatePage from "../../../../templates/TemplatePage";

const ContextEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contextSelected, contextUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [newContext, setNewContext] = useState(contextSelected);

  // contexts in context form
  const [contexts, setContexts] = useState(contextSelected.contexts);
  useEffect(() => {
    setNewContext((prev) => ({
      ...prev,
      contexts: contexts,
    }));
  }, [contexts]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await contextUpdate(newContext);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("contexts");
    }
  };

  return (
    <TemplatePage
      title={t("contexts.edit.title", { name: contextSelected.label })}
      setSelectedComponent={setSelectedComponent}
      route={"contexts"}
      submit={submit}
      isEdit
      hasTabs={newContext.type === "outcall" ? false : true}
      errors={errors}
      loading={loading}
    >
      {newContext.type === "incall" && (
        <ContextIncall
          context={newContext}
          setContext={setNewContext}
          contexts={contexts}
          setContexts={setContexts}
        />
      )}
      {newContext.type === "internal" && (
        <ContextInternal
          context={newContext}
          setContext={setNewContext}
          contexts={contexts}
          setContexts={setContexts}
        />
      )}
      {newContext.type === "outcall" && (
        <ContextOutcall
          context={newContext}
          setContext={setNewContext}
          contexts={contexts}
          setContexts={setContexts}
        />
      )}
    </TemplatePage>
  );
};

export default ContextEdit;
