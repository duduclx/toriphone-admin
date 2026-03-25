import { useState } from "react";
import { Field, Table, Tabs, Button, Box } from "@chakra-ui/react";
import { ButtonAddUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import MohEditContent from "./MohEditContent";
import TemplatePage from "../../../templates/TemplatePage";
import FormContainer from "../../../templates/forms/FormContainer";

const MohEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { mohSelected, setMohSelected, mohGet, mohEdit, mohFileUpload } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [moh, setMoh] = useState(mohSelected);
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    setError(null);
    setLoading(true);
    if (!file) {
      setLoading(false);
      setError(t("common.file_empty"));
      return;
    }

    const upload = await mohFileUpload(mohSelected, file);

    if (upload.ok) {
      // reload moh
      const update = await mohGet(mohSelected);
      setMohSelected(update);
      setMoh(update);
      setLoading(false);
    } else {
      setLoading(false);
      setError(upload.message);
    }
  };

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await mohEdit(moh);
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
      title={t("mohs.edit.title", { name: mohSelected.label })}
      setSelectedComponent={setSelectedComponent}
      route={"mohs"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <Tabs.Root defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
          <Tabs.Trigger value="files">{t("common.files")}</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content width="50%" m="auto" value="general">
          {/* général */}
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
        </Tabs.Content>

        <Tabs.Content value="files">
          {/* fichiers */}
          <Field.Root invalid={error} p="8">
            <Box display="flex" justifyContent="space-between" gap="4">
              <InputUi id="file" type="file" opacity="0" position="absolute" zIndex="-1" onChange={handleFileChange} />
              <Button colorPalette="secondary" as="label" htmlFor="file" textAlign="center">
                {t("common.browse")}
              </Button>
              <InputUi readOnly value={file?.name || t("common.file_empty")} width="60%" />
              <ButtonAddUi text={t("common.file_add")} onClick={handleFileUpload} />
            </Box>
            <Field.ErrorText>{error}</Field.ErrorText>
          </Field.Root>
          <Table.ScrollArea>
            <Table.Root>
              <Table.Header>
                <Table.Row bg="TableHeaderBg">
                  <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.player")}</Table.ColumnHeader>
                  <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {moh.files.map((file, index) => (
                  <MohEditContent key={index} file={file} setMoh={setMoh} />
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Tabs.Content>
      </Tabs.Root>
    </TemplatePage>
  );
};

export default MohEdit;
