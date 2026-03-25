import { useEffect } from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { NativeSelectUi } from "../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";

import PhonebooksContactsList from "./content/PhonebooksContactsList";
import TemplatePage from "../../templates/TemplatePage";

const PhonebooksContacts = ({ setSelectedComponent }) => {
  //requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebooks, phonebooksGet, phonebookSelected, setPhonebookSelected } = useApis();

  useEffect(() => {
    phonebooksGet();
  }, []);

  useEffect(() => {
    if (!Object.keys(phonebookSelected).length && phonebooks?.items?.length > 0) {
      setPhonebookSelected(phonebooks.items[0]);
    }
  }, [phonebooks]);

  const onChangePhonebook = (e) => {
    const ph = phonebooks.items.find((item) => item.name === e.target.value);
    setPhonebookSelected(ph);
  };

  return (
    <TemplatePage
      setSelectedComponent={setSelectedComponent}
      title={t("phonebooks_contacts.list.title")}
      route={"phonebooksContactCreate"}
      isList
    >
      {phonebooks?.items && (
        <HStack spacing="4" mt="4">
          <Text>{t("phonebooks_contacts.select_phonebook")} :</Text>
          <Box>
            <NativeSelectUi value={phonebookSelected.name} onChange={(e) => onChangePhonebook(e)}>
              {phonebooks.items.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </NativeSelectUi>
          </Box>
        </HStack>
      )}
      <PhonebooksContactsList setSelectedComponent={setSelectedComponent} />
    </TemplatePage>
  );
};

export default PhonebooksContacts;
