import { useEffect } from "react";
import { Flex, Field } from "@chakra-ui/react";
import { CheckboxUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import MohForm from "../../../helpers/forms/MohForm";
import FormContainer from "../../../templates/forms/FormContainer";

const ConferenceForm = ({ conference, setConference, availableExtensions, line, setLine, moh, setMoh }) => {
  // requirements
  const { t } = useTranslation("admin");

  // moh
  useEffect(() => {
    setConference((prev) => ({
      ...prev,
      music_on_hold: moh?.value || null,
      music_on_hold_with_label: moh,
    }));
  }, [moh]);

  return (
    <FormContainer>
      <Flex justifyContent="space-between">
        <Field.Root width="48%">
          <Field.Label>{t("common.name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.name")}
            value={conference.name}
            onChange={(e) => setConference({ ...conference, name: e.target.value })}
          />
        </Field.Root>
        <Field.Root width="48%">
          <Field.Label>{t("common.number")} :</Field.Label>
          <NativeSelectUi
            value={line.exten}
            onChange={(e) =>
              setLine({
                ...line,
                exten: e.target.value,
              })
            }
          >
            {conference.extensions?.length > 0 && (
              <option value={conference.extensions[0].exten} key={conference.extensions[0].exten}>
                {conference.extensions[0].exten}
              </option>
            )}
            {availableExtensions.map((exten) => (
              <option value={exten} key={exten}>
                {exten}
              </option>
            ))}
          </NativeSelectUi>
        </Field.Root>
      </Flex>
      <Field.Root>
        <Field.Label>{t("common.pin")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.pin")}
          value={conference.pin}
          onChange={(e) => setConference({ ...conference, pin: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.pin_admin")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.pin_admin")}
          value={conference.admin_pin}
          onChange={(e) => setConference({ ...conference, admin_pin: e.target.value })}
        />
      </Field.Root>
      <MohForm moh={moh} setMoh={setMoh} />
      <CheckboxUi
        checked={conference.announce_join_leave}
        onCheckedChange={(e) =>
          setConference({
            ...conference,
            announce_join_leave: e.target.checked,
            quiet_join_leave: !e.checked,
          })
        }
      >
        {t("conferences.announce_join_leave")}
      </CheckboxUi>
      <CheckboxUi
        checked={conference.announce_user_count}
        onCheckedChange={(e) => setConference({ ...conference, announce_user_count: e.checked })}
      >
        {t("conferences.announce_user_count")}
      </CheckboxUi>
      <CheckboxUi
        checked={conference.announce_only_user}
        onCheckedChange={(e) => setConference({ ...conference, announce_only_user: e.checked })}
      >
        {t("conferences.announce_only_user")}
      </CheckboxUi>
      <Field.Root>
        <Field.Label>{t("common.subroutine")} :</Field.Label>
        <InputUi
          placeholder={t("common.subroutine")}
          value={conference.preprocess_subroutine}
          onChange={(e) => setConference({ ...conference, preprocess_subroutine: e.target.value })}
        />
      </Field.Root>
    </FormContainer>
  );
};

export default ConferenceForm;
