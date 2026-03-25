import { Flex, Text } from '@chakra-ui/react';
import { CheckboxUi } from '../../../ui';
import { useTranslation } from 'react-i18next';

const UserCreateStepThree = ({addVoicemail, setAddVoicemail}) => {
  // requirements
  const { t } = useTranslation("admin");

  const handleCheckboxChange = (e) => {
    setAddVoicemail(e.checked);
  };

  return (
    <Flex flexDirection="column" flex="1" justifyContent="center" alignItems="center">
      <Text fontSize="xl" textAlign="center" mb="4">
      {t("users.lines.create.voicemail_title")} 
        </Text>
      <CheckboxUi 
      checked={addVoicemail}
      onCheckedChange={handleCheckboxChange}>{t("users.lines.create.voicemail_activate")}</CheckboxUi>
    </Flex>
  )
}

export default UserCreateStepThree