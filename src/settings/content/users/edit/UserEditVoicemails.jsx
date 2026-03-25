import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditVoicemails = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { voicemailsGet } = useApis();

  useEffect(() => {
    if (user.voicemail) {
      const updated = {
        ...user.voicemail,
        label: user.voicemail.name,
      };
      setUser((prevUser) => ({
        ...prevUser,
        voicemail: updated,
      }));
    }
  }, []);

  const load = () => {
    return new Promise(async (resolve) => {
      const voicemails = await voicemailsGet();
      const filtered = voicemails.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const onchange = (selectedOptions) => {
    if (selectedOptions) {
      const transformed = {
        id: selectedOptions.value,
        name: selectedOptions.label,
        label: selectedOptions.label,
      };
      setUser((prev) => ({
        ...prev,
        voicemail: transformed,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        voicemail: null,
      }));
    }
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.voicemail")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={onchange}
        value={user.voicemail || ""}
        placeholder={t("users.lines.voicemail_select")}
      />
    </Field.Root>
  );
};

export default UserEditVoicemails;
