import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { NativeSelectUi } from "../../../ui";

import { useApis } from "../../../../ApiProvider";

const TenantContact = ({ contact, setContact }) => {
  // requirements

  // api
  const { phonebooks, phonebooksGet, phonebookContacts, phonebookContactsGet } = useApis();

  const [selectedPhonebook, setSelectedPhonebook] = useState("");

  useEffect(() => {
    phonebooksGet();
  }, []);

  useEffect(() => {
    if (phonebooks?.items && phonebooks?.items?.length > 0) {
      setSelectedPhonebook(phonebooks.items[0]);
      phonebookContactsGet(phonebooks.items[0]);
    }
  }, [phonebooks]);

  useEffect(() => {
    if (phonebookContacts?.items && phonebookContacts?.items?.length > 0) {
      setContact(phonebookContacts.items[0].id);
    }
  }, [phonebookContacts]);

  const getContacts = (e) => {
    setSelectedPhonebook(e.target.value);
    phonebookContactsGet({ uuid: e.target.value });
  };

  return (
    <>
      {phonebooks?.items && (
        <Flex justifyContent="space-between">
          <NativeSelectUi
            width="48%"
            value={selectedPhonebook}
            onChange={(e) => {
              getContacts(e);
            }}
          >
            {phonebooks.items.map((phonebook, index) => (
              <option value={phonebook.uuid} key={index}>
                {phonebook.name}
              </option>
            ))}
          </NativeSelectUi>
          {phonebookContacts && (
            <NativeSelectUi
              width="48%"
              value={contact || ""}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            >
              {phonebookContacts?.items &&
                phonebookContacts?.items.map((contact, index) => (
                  <option value={contact.id} key={index}>
                    {contact.firstname + " " + contact.lastname}
                  </option>
                ))}
            </NativeSelectUi>
          )}
        </Flex>
      )}
    </>
  );
};

export default TenantContact;
