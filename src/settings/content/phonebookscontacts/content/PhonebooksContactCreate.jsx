import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PhonebooksContactForm from "../forms/PhonebooksContactForm";

const PhonebooksContactCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebookSelected, phonebookContactAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [contact, setContact] = useState({
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    mobile_phone: null,
    fax: null,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phonebookContactAdd(phonebookSelected, contact);
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
      title={t("phonebooks_contacts.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"phonebooksContacts"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <PhonebooksContactForm contact={contact} setContact={setContact}/>
    </TemplatePage>
  );
};

export default PhonebooksContactCreate;
