import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi, CheckboxUi, InputUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import GroupMembersForm from "../../../helpers/forms/GroupMembersForm";
import FormContainer from "../../../templates/forms/FormContainer";
import { useApis } from "../../../../ApiProvider";

const PagingForm = ({ paging, setpaging, members, setMembers, callers, setCallers, error }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { soundCategoryGet } = useApis();

  // number
  const handleNumberChange = (e) => {
    setpaging((prev) => ({
      ...prev,
      number: e.value === "" ? null : e.value,
    }));
  };

  // members
  useEffect(() => {
    setpaging((prev) => ({
      ...prev,
      members: {
        users: members,
      },
    }));
  }, [members]);

  // callers
  useEffect(() => {
    setpaging((prev) => ({
      ...prev,
      callers: {
        users: callers,
      },
    }));
  }, [callers]);

  // announce sound
  const load = () => {
    return new Promise(async (resolve) => {
      const res = await soundCategoryGet("playback");
      // Transformation des fichiers en { label, value }
      const files = res.files.map((file) => ({
        label: file.name,
        value: file.name,
      }));
      resolve(files);
    });
  };

  return (
    <FormContainer>
      <Field.Root invalid={!!error.name}>
        <Field.Label>{t("common.name")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.name")}
          value={paging.name}
          onChange={(e) => setpaging({ ...paging, name: e.target.value })}
        />
        {error.name && <Field.ErrorText>{error.name}</Field.ErrorText>}
      </Field.Root>
      <Field.Root invalid={!!error.number}>
        <Field.Label>{t("common.number")} :</Field.Label>
        <NumberInputUi min={0} value={paging.number || ""} allowMouseWheel onValueChange={handleNumberChange} />
        {error.number && <Field.ErrorText>{error.number}</Field.ErrorText>}
      </Field.Root>
      <CheckboxUi
        checked={paging.announce_caller}
        onCheckedChange={(e) =>
          setpaging({
            ...paging,
            announce_caller: e.checked,
          })
        }
      >
        {t("common.announce_caller")}
      </CheckboxUi>
      <Field.Root>
        <Field.Label>{t("common.announce_sound")} :</Field.Label>
        <AsyncSelectUi
          loadOptions={load}
          defaultOptions
          isClearable
          onChange={(e) =>
            setpaging({ ...paging, announce_sound: e ? e.value : null, announce_sound_helper: e ? e : null })
          }
          value={paging.announce_sound_helper || null}
        />
        <Field.HelperText>{t("sounds.sound_announce_helper")}</Field.HelperText>
      </Field.Root>
      <CheckboxUi
        checked={paging.caller_notification}
        onCheckedChange={(e) =>
          setpaging({
            ...paging,
            caller_notification: e.checked,
          })
        }
      >
        {t("common.caller_notification")}
      </CheckboxUi>
      <GroupMembersForm groupMembers={members} setGroupMembers={setMembers} />
      <GroupMembersForm label={t("common.caller")} groupMembers={callers} setGroupMembers={setCallers} />
      <CheckboxUi
        checked={paging.ignore_forward}
        onCheckedChange={(e) =>
          setpaging({
            ...paging,
            ignore_forward: e.checked,
          })
        }
      >
        {t("common.ignore_forward")}
      </CheckboxUi>
      <CheckboxUi
        checked={paging.duplex}
        onCheckedChange={(e) =>
          setpaging({
            ...paging,
            duplex: e.checked,
          })
        }
      >
        {t("common.duplex")}
      </CheckboxUi>
      <CheckboxUi
        checked={paging.record}
        onCheckedChange={(e) =>
          setpaging({
            ...paging,
            record: e.checked,
          })
        }
      >
        {t("common.record")}
      </CheckboxUi>
    </FormContainer>
  );
};

export default PagingForm;
