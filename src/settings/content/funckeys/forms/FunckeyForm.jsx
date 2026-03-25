import { Field, Tabs } from "@chakra-ui/react";
import { ButtonAddUi, InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import FunckeyOptions from "../../../helpers/funckeys/FunckeyOptions";
import FormContainer from "../../../templates/forms/FormContainer";

const FunckeyForm = ({ fk, setFk, funckeys, setFunckeys }) => {
  // requirements
  const { t } = useTranslation("admin");

  // funckeys add
  const handleAddKey = () => {
    const newId = funckeys.length + 1;
    setFunckeys((prev) => [
      ...prev,
      {
        inherited: false,
        blf: false,
        label: "",
        position: newId,
        destination: null,
      },
    ]);
  };

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="funckeys">{t("funckeys.funckeys")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <Field.Root>
          <Field.Label>{t("common.name")} :</Field.Label>
          <InputUi
            required
            placeholder={t("common.name")}
            value={fk.name}
            onChange={(e) => setFk({ ...fk, name: e.target.value })}
          />
        </Field.Root>
      </Tabs.Content>

      <Tabs.Content value="funckeys">
        <FormContainer>
          {funckeys.length > 0 && (
            <FormContainer>
              {funckeys.map((funckey, index) => (
                <FunckeyOptions
                  key={index}
                  funckey={funckey}
                  index={index}
                  funckeys={funckeys}
                  setFunckeys={setFunckeys}
                />
              ))}
            </FormContainer>
          )}
          <ButtonAddUi text={t("destinations.funckeys.add")} onClick={handleAddKey} />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default FunckeyForm;
