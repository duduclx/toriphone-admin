import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import PhoneNumberForm from "../forms/PhoneNumberForm";

const PhoneNumberEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phoneNumbersSelected, phoneNumberEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [phoneNumber, setPhoneNumber] = useState(phoneNumbersSelected);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phoneNumberEdit(phoneNumber);
    if (res.error) {
      setLoading(false);
      setErrors({title: res.status, description: res.message});
    } else {
      setLoading(false);
      setSelectedComponent("phoneNumbers");
    }
  };

  return (
    <TemplatePage
      title={t("phoneNumbers.edit.title", { name: phoneNumbersSelected.caller_id_name })}
      setSelectedComponent={setSelectedComponent}
      route={"phoneNumbers"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <PhoneNumberForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
    </TemplatePage>
  );
};

export default PhoneNumberEdit;
