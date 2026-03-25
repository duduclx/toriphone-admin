import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PhonebooksContactForm from "../forms/PhonebooksContactForm";

const PhonebooksContactEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebookSelected, phonebookContactSelected, phonebookContactEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [contact, setContact] = useState(phonebookContactSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phonebookContactEdit(phonebookSelected, contact);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("phonebooksContacts");
    }
  };

  return (
    <TemplatePage
      title={t("phonebooks_contacts.edit.title", {
        name: phonebookContactSelected.firstname + " " + phonebookContactSelected.lastname,
      })}
      setSelectedComponent={setSelectedComponent}
      route={"phonebooksContacts"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <PhonebooksContactForm contact={contact} setContact={setContact}/>
    </TemplatePage>
  );
};

export default PhonebooksContactEdit;
