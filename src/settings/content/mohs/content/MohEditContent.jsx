import { Text, IconButton, Button, Table, useDisclosure, Dialog } from "@chakra-ui/react";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import MohPlayer from "./MohPlayer";
import { IconButtonTrashUi } from "../../../ui";

const MohEditContent = ({ file, setMoh }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  const { mohSelected, setMohSelected, mohFileGet, mohFileDelete } = useApis();

  const handleDownloadSound = async () => {
    try {
      const blob = await mohFileGet(mohSelected, file);
      const url = window.URL.createObjectURL(blob);

      // Créer un lien pour permettre le téléchargement
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();

      // Nettoyer l'URL après le téléchargement
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier audio :", error);
    }
  };

  const handleDelete = async () => {
    await mohFileDelete(mohSelected, file);
    const updatedItems = mohSelected.files.filter((item) => item.name !== file.name);
    setMohSelected((prev) => ({
      ...prev,
      files: updatedItems,
    }));
    setMoh((prev) => ({
      ...prev,
      files: updatedItems,
    }));
    onClose();
  };

  return (
    <>
      <Table.Row bg="TableBodyBg">
        <Table.Cell>{file.name}</Table.Cell>
        <Table.Cell>
          <MohPlayer mohSelected={mohSelected} file={file} />
        </Table.Cell>
        <Table.Cell>
          <IconButton
            variant="ghost"
            colorPalette="secondary"
            onClick={() => {
              handleDownloadSound();
            }}
          >
            <FaDownload />
          </IconButton>
          <IconButtonTrashUi onClick={onOpen} />
        </Table.Cell>
      </Table.Row>
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("sounds.delete.file.title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>{t("sounds.delete.file.subTitle", { name: file.name })}</Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="danger" onClick={() => handleDelete()}>
                {t("common.delete")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default MohEditContent;
