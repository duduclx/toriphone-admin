import { Box, Field } from "@chakra-ui/react";
import { AsyncSelectUi, InputUi } from "../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../ApiProvider";
import FormContainer from "../../templates/forms/FormContainer";

const QueueOptions = ({ destination, setDestination, destinationType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { queuesSkillrulesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const res = await queuesSkillrulesGet();
      const filtered = res.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  const change = (e) => {
    e === null
      ? setDestination({
          ...destination,
          type: destinationType,
          skill_rule_id: null,
          skill_rule: null,
        })
      : setDestination({
          ...destination,
          type: destinationType,
          skill_rule_id: e.value,
          skill_rule: {
            label: e.label,
            value: e.value,
          },
        });
  };

  const changeVariables = (e) => {
    e === null
      ? setDestination({
          ...destination,
          type: destinationType,
          skill_rule_variables: null,
        })
      : setDestination({
          ...destination,
          type: destinationType,
          skill_rule_variables: e.target.value,
        });
  };

  return (
    <Box mt="4">
      <FormContainer>
        <Field.Root>
          <Field.Label>{t("common.skill_rule_label")} :</Field.Label>
          <AsyncSelectUi
            loadOptions={load}
            defaultOptions
            onChange={change}
            value={destination?.skill_rule || ""}
            placeholder={t("common.skill_rule_select")}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>{t("common.skill_variables_label")} :</Field.Label>
          <InputUi
            minW="300px"
            width="fit-content"
            placeholder={t("common.skill_variables_select")}
            value={destination?.skill_rule_variables || ""}
            onChange={(e) => changeVariables(e)}
          />
          <Field.HelperText>{t("common.skill_variables_helper")}</Field.HelperText>
        </Field.Root>
      </FormContainer>
    </Box>
  );
};

export default QueueOptions;
