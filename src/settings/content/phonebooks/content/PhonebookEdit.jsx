import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PhonebooksForm from "../forms/PhonebooksForm";

const PhonebookEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebookSelected, phonebookEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [phonebook, setPhonebook] = useState({
    name: phonebookSelected.name,
    description: phonebookSelected.description,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phonebookEdit(phonebookSelected, phonebook);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("phonebooks");
    }
  };

  return (
    <TemplatePage
      title={t("phonebooks.edit.title", { name: phonebookSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"phonebooks"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <PhonebooksForm phonebook={phonebook} setPhonebook={setPhonebook}/>
    </TemplatePage>
  );
};

export default PhonebookEdit;
