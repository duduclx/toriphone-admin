import { useState } from "react";
import { Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const MohCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { mohAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [moh, setMoh] = useState({
    application: null,
    label: null,
    mode: "files",
    sort: "alphabetical",
  });

  const modeOptions = [
    { label: t("common.custom"), value: "custom" },
    { label: t("common.files"), value: "files" },
  ];

  const sortOptions = [
    { label: t("common.none"), value: "" },
    { label: t("common.alphabetical"), value: "alphabetical" },
    { label: t("common.random"), value: "random" },
    { label: t("common.random_start"), value: "random_start" },
  ];

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await mohAdd(moh);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("mohs");
    }
  };

  return (
    <TemplatePage
      title={t("mohs.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"mohs"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <FormContainer>
        <Field.Root>
          <Field.Label>{t("common.name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.name")}
            value={moh.label}
            onChange={(e) => setMoh({ ...moh, label: e.target.value })}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("common.mode")} :</Field.Label>
          <NativeSelectUi
            value={moh.mode}
            onChange={(e) =>
              setMoh({
                ...moh,
                mode: e.target.value,
              })
            }
          >
            {modeOptions.map((mode, index) => (
              <option value={mode.value} key={index}>
                {mode.label}
              </option>
            ))}
          </NativeSelectUi>
        </Field.Root>
        {moh.mode === "custom" && (
          <Field.Root>
            <Field.Label>{t("common.application")} :</Field.Label>
            <InputUi
              placeholder={t("common.application")}
              value={moh.application}
              onChange={(e) => setMoh({ ...moh, application: e.target.value })}
            />
            <Field.HelperText>{t("mohs.application_help")}</Field.HelperText>
          </Field.Root>
        )}
        {moh.mode === "files" && (
          <Field.Root>
            <Field.Label>{t("common.sort")} :</Field.Label>
            <NativeSelectUi
              value={moh.sort || ""}
              onChange={(e) =>
                setMoh({
                  ...moh,
                  sort: e.target.value === "" ? null : e.target.value,
                })
              }
            >
              {sortOptions.map((mode, index) => (
                <option value={mode.value} key={index}>
                  {mode.label}
                </option>
              ))}
            </NativeSelectUi>
            <Field.HelperText>{t("mohs.sort_help")}</Field.HelperText>
          </Field.Root>
        )}
      </FormContainer>
    </TemplatePage>
  );
};

export default MohCreate;
