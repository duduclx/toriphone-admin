import { Field, HStack } from "@chakra-ui/react";
import { CheckboxUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const UserEditForwards = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer alignSelf="center" justifyContent="center">
      <Field.Root>
        <Field.Label htmlFor="busy">{t("users.forwards.busy")} :</Field.Label>
        <HStack>
          <InputUi
            id="busy"
            placeholder={t("common.number")}
            value={user.forwards.busy.destination || ""}
            onChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  busy: {
                    ...user.forwards.busy,
                    destination: e.target.value,
                  },
                },
              })
            }
          />
          <CheckboxUi
            checked={user.forwards.busy.enabled}
            onCheckedChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  busy: {
                    ...user.forwards.busy,
                    enabled: e.checked,
                  },
                },
              })
            }
          >
            {t("common.enabled")}
          </CheckboxUi>
        </HStack>
      </Field.Root>
      <Field.Root>
        <Field.Label htmlFor="noanswer">{t("users.forwards.noanswer")} :</Field.Label>
        <HStack>
          <InputUi
            id="noanswer"
            placeholder={t("common.number")}
            value={user.forwards.noanswer.destination || ""}
            onChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  noanswer: {
                    ...user.forwards.noanswer,
                    destination: e.target.value,
                  },
                },
              })
            }
          />
          <CheckboxUi
            checked={user.forwards.noanswer.enabled}
            onCheckedChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  noanswer: {
                    ...user.forwards.noanswer,
                    enabled: e.checked,
                  },
                },
              })
            }
          >
            {t("common.enabled")}
          </CheckboxUi>
        </HStack>
      </Field.Root>
      <Field.Root>
        <Field.Label htmlFor="unconditional">{t("users.forwards.unconditional")} :</Field.Label>
        <HStack>
          <InputUi
            id="unconditional"
            placeholder={t("common.number")}
            value={user.forwards.unconditional.destination || ""}
            onChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  unconditional: {
                    ...user.forwards.unconditional,
                    destination: e.target.value,
                  },
                },
              })
            }
          />
          <CheckboxUi
            checked={user.forwards.unconditional.enabled}
            onCheckedChange={(e) =>
              setUser({
                ...user,
                forwards: {
                  ...user.forwards,
                  unconditional: {
                    ...user.forwards.unconditional,
                    enabled: e.checked,
                  },
                },
              })
            }
          >
            {t("common.enabled")}
          </CheckboxUi>
        </HStack>
      </Field.Root>
    </FormContainer>
  );
};

export default UserEditForwards;
