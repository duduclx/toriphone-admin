import {
  Text,
  IconButton,
  Button,
  Table,
  useDisclosure,
  Dialog
} from "@chakra-ui/react";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import SoundPlayer from "./SoundPlayer";

const SoundEditContent = ({ file }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // api
  const { soundSelected, setSoundSelected, soundCategoryFileGet, soundCategoryFileDelete } = useApis();

  const handleDownloadSound = async () => {
    try {
      const blob = await soundCategoryFileGet(soundSelected.name, file.name);
      const url = window.URL.createObjectURL(blob);

      const format = file.formats[0].format == "slin" ? "wav" : file.formats[0].format;

      // Créer un lien pour permettre le téléchargement
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name + "." + format; // Nom du fichier pour le téléchargement
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
    await soundCategoryFileDelete(soundSelected.name, file.name);
    const updatedItems = soundSelected.files.filter((item) => item.name !== file.name);
    setSoundSelected((prev) => ({
      ...prev,
      files: updatedItems,
    }));
    onClose();
  };

  return (
    <>
      <Table.Row bg="TableHeaderBg">
        <Table.Cell>{file.name}</Table.Cell>
        <Table.Cell>{file.formats[0].language}</Table.Cell>
        <Table.Cell>{file.formats[0].format == "slin" ? "wav" : file.formats[0].format}</Table.Cell>
        <Table.Cell><SoundPlayer soundSelected={soundSelected} file={file}/></Table.Cell>
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
          <IconButton variant="ghost" colorPalette="danger" onClick={onOpen}>
            <FaTrashAlt />
          </IconButton>
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

export default SoundEditContent;
