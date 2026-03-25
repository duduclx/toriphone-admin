import { useState } from "react";
import { Box, Button, Field, Table } from "@chakra-ui/react";
import { ButtonAddUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import SoundEditContent from "./SoundEditContent";
import TemplatePage from "../../../templates/TemplatePage";
import TemplateTableEmpty from "../../../templates/TemplateTableEmpty";

const SoundEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // error
  const [error, setError] = useState(null);

  // api
  const { soundSelected, setSoundSelected, soundCategoryFilePut, soundCategoryGet } = useApis();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState("");
  const [language, setLanguage] = useState("");

  const getFileNameWithoutExtension = (fileName) => {
    const parts = fileName.split(".");
    if (parts.length > 1) {
      parts.pop();
      setFileName(parts.join("."));
    }
    return fileName;
  };

  const getFileExtension = (fileName) => {
    const parts = fileName.split(".");
    if (parts.length > 1) {
      const extension = parts.pop();
      setFormat(extension);
    }
    return "";
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      getFileNameWithoutExtension(e.target.files[0].name);
      getFileExtension(e.target.files[0].name);
    }
  };

  // submit
  const handleFileUpload = async () => {
    setError(null);
    if (!file) {
      setError(t("common.file_empty"));
      return;
    }

    const upload = await soundCategoryFilePut(soundSelected.name, fileName, file, format);

    if (upload.ok) {
      // reload sounds
      const update = await soundCategoryGet(soundSelected.name);
      setSoundSelected(update);
    } else {
      setError(upload.message);
    }
  };

  return (
    <TemplatePage
      title={t("sounds.edit.category.title", { name: soundSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"sounds"}
      isList
      hasNoAdd
    >
      <Field.Root invalid={error} p="8">
        <Field.Label>{t("sounds.edit.file.select")}</Field.Label>
        <Box display="flex" justifyContent="space-between" gap="4">
          <InputUi id="file" type="file" opacity="0" position="absolute" zIndex="-1" onChange={handleFileChange} />
          <Button colorPalette="secondary" as="label" htmlFor="file" textAlign="center">
            {t("common.browse")}
          </Button>
          <InputUi readOnly value={file?.name || t("common.file_empty")} width="100%" />
          <InputUi placeholder={t("common.language")} value={language} onChange={(e) => setLanguage(e.target.value)} />
          <ButtonAddUi text={t("common.file_add")} onClick={handleFileUpload} />
        </Box>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
      <Table.ScrollArea width="100%" height="calc(100vh - 300px)" overflowY="auto">
        <Table.Root variant="line">
          <Table.Caption></Table.Caption>
          <Table.Header>
            <Table.Row bg="TableHeaderBg">
              <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.language")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.format")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.sound_player")}</Table.ColumnHeader>
              <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {soundSelected.files.length == 0 ? (
              <TemplateTableEmpty colSpan="5"/>
            ) : (
              soundSelected.files.map((file, index) => <SoundEditContent file={file} key={index} />)
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </TemplatePage>
  );
};

export default SoundEdit;
