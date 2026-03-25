import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import PhonebooksForm from "../forms/PhonebooksForm";

const PhonebookCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phonebookAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [phonebook, setPhonebook] = useState({});

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phonebookAdd(phonebook);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("phonebooks");
    }
  };

  return (
    <TemplatePage
      title={t("phonebooks.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"phonebooks"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <PhonebooksForm phonebook={phonebook} setPhonebook={setPhonebook}/>
    </TemplatePage>
  );
};

export default PhonebookCreate;
