import { Flex, Field, Tabs } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../templates/forms/FormContainer";

const PolicyForm = ({ policy, setPolicy, error, setError }) => {
  // requirements
  const { t } = useTranslation("admin");

  const editName = (e) => {
    setError(null);
    setPolicy({ ...policy, name: e.target.value });
  };

  const addAcl = () => {
    setPolicy({ ...policy, acl: [...policy.acl, ""] });
  };

  const removeAcl = (index) => {
    const newAcls = [...policy.acl];
    newAcls.splice(index, 1);
    setPolicy({ ...policy, acl: newAcls });
  };

  const updateAcl = (index, value) => {
    const newAcls = [...policy.acl];
    newAcls[index] = value;
    setPolicy({ ...policy, acl: newAcls });
  };

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="acls">{t("common.acls")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer>
          <Field.Root invalid={!!error}>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi required placeholder={t("common.name")} value={policy.name} onChange={editName} />
            <Field.ErrorText>{error}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.description")} :</Field.Label>
            <InputUi
              placeholder={t("common.description")}
              value={policy.description}
              onChange={(e) => setPolicy({ ...policy, description: e.target.value })}
            />
          </Field.Root>

          {/*
              <CheckboxUi
            checked={policy.shared}
            onCheckedChange={(e) =>
              setPolicy({
                ...policy,
                shared: e.checked,
              })
            }
          >shared
          </CheckboxUi>
          <CheckboxUi
            checked={policy.read_only}
            onCheckedChange={(e) =>
              setPolicy({
                ...policy,
                read_only: e.checked,
              })
            }
          >read only
          </CheckboxUi>
              */}
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="acls">
        <FormContainer>
          {policy.acl.map((access, index) => (
            <Flex key={index} gap="4">
              <IconButtonTrashUi onClick={() => removeAcl(index)} />
              <InputUi placeholder={t("common.acl")} value={access} onChange={(e) => updateAcl(index, e.target.value)} />
            </Flex>
          ))}
          <ButtonAddUi text={t("common.acl_add")} onClick={addAcl} />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default PolicyForm;
