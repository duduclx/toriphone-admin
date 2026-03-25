import { Button, Dialog, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TemplateDelete = ({ open, onClose, title, subTitle, submit, loading }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="bgDefault">
          <Dialog.Header alignSelf="center">
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
            <Text>{subTitle}</Text>
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorPalette="danger" onClick={submit} loading={loading}>
              {t("common.delete")}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default TemplateDelete;
