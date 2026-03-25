import { Button, Dialog, Code } from "@chakra-ui/react";
import { toaster } from "../../components/ui/toaster";
import { useTranslation } from "react-i18next";

const TemplateDetails = ({ ressource, isEyeOpen, onEyeOpen, onEyeClose }) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleCopyToClipboard = () => {
    const content = JSON.stringify(ressource, null, 2);
    navigator.clipboard.writeText(content).then(() => {
      toaster.create({
        title: t("common.copy_title"),
        description: t("common.copy_description"),
        type: "success",
        duration: 4000,
        closable: true,
      });
    });
  };

  return (
    <Dialog.Root open={isEyeOpen} onOpenChange={onEyeClose} scrollBehavior="inside" size="xl">
      <Dialog.Backdrop width="100%" />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{t("common.copy_modal_title")} :</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Code w="full" fontSize="md" whiteSpace="pre-wrap">{JSON.stringify(ressource, null, 2)}</Code>
          </Dialog.Body>

          <Dialog.Footer>
            <Button colorPalette="primary" mr={3} onClick={handleCopyToClipboard}>
              {t("common.copy")}
            </Button>
            <Button colorPalette="danger" onClick={onEyeClose}>
              {t("common.close")}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default TemplateDetails;
