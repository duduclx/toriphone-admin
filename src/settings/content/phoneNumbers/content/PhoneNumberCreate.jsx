import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import PhoneNumberForm from "../forms/PhoneNumberForm";

const PhoneNumberCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { phoneNumberAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [phoneNumber, setPhoneNumber] = useState({
    caller_id_name: null,
    main: false,
    number: "",
    shared: true,
  });

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await phoneNumberAdd(phoneNumber);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("phoneNumbers");
    }
  };

  return (
    <TemplatePage
      title={t("phoneNumbers.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"phoneNumbers"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <PhoneNumberForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
    </TemplatePage>
  );
};

export default PhoneNumberCreate;
