import { Flex, Field } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import UserForm from "../../../helpers/forms/UserForm";
import SkillForm from "./SkillForm";
import FormContainer from "../../../templates/forms/FormContainer";

const AgentForm = ({agent, setAgent, user, setUser}) => {
    // requirements
  const { t } = useTranslation("admin");

  return (
    <FormContainer>
      <UserForm user={user} setUser={setUser}/>
      <Field.Root>
        <Field.Label>{t("common.firstname")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.firstname")}
          value={agent.firstname}
          onChange={(e) => setAgent({ ...agent, firstname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.lastname")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.lastname")}
          value={agent.lastname}
          onChange={(e) => setAgent({ ...agent, lastname: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.password")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.password")}
          value={agent.password}
          onChange={(e) => setAgent({ ...agent, password: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.description")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.description")}
          value={agent.description}
          onChange={(e) => setAgent({ ...agent, description: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.number")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.number")}
          value={agent.number}
          onChange={(e) => setAgent({ ...agent, number: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.language")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.language")}
          value={agent.language}
          onChange={(e) => setAgent({ ...agent, language: e.target.value })}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("common.subroutine")} :</Field.Label>
        <InputUi
          required
          placeholder={t("common.subroutine")}
          value={agent.preprocess_subroutine}
          onChange={(e) => setAgent({ ...agent, preprocess_subroutine: e.target.value })}
        />
      </Field.Root>
      <SkillForm agent={agent} setAgent={setAgent}/>
    </FormContainer>
  )
}

export default AgentForm
