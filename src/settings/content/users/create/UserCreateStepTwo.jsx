import { Flex, Text } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const UserCreateStepTwo = ({ availableExtensions, extension, setExtension, line, setLine }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <FormContainer alignSelf="center" width="50%">
        <Text fontSize="xl" textAlign="center" mb="4">
          {t("users.lines.create.line_title")}
        </Text>

        <Text>{t("users.lines.create.line_number")} :</Text>

        <NativeSelectUi
          value={extension}
          onChange={(e) => {
            setExtension(e.target.value);
            setLine({
              ...line,
              extensions: {
                ...line.extensions,
                exten: e.target.value,
              },
            });
          }}
        >
          {availableExtensions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </NativeSelectUi>
      </FormContainer>
    </Flex>
  );
};

export default UserCreateStepTwo;
