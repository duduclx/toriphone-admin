import { Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../templates/TemplatePage";
import FormContainer from "../../templates/forms/FormContainer";
import white from "/toriLogoApp.svg";

const About = () => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <TemplatePage hasNoAdd title={t("about.title")}>
      <FormContainer>
        <Image alt="Toriphone logo" src={white}/>
        <Heading as="h1" size="xl" textAlign="center">
          Toriphone Admin
        </Heading>
        <Text textAlign="center">{t("about.version")} : 1.1.14</Text>
        <Text textAlign="center">{t("about.compatibility")} : 25.17</Text>
        <Text textAlign="center">Copyright 2024 - 2025 ToriPhone {t("about.copyright")}</Text>
      </FormContainer>
    </TemplatePage>
  );
};

export default About;
