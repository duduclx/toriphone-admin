import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TemplatePage from "../../../templates/TemplatePage";

import SourceCreateConference from "./SourceCreateConference";
import SourceCreateCsv from "./SourceCreateCsv";
import SourceCreateCsvWs from "./SourceCreateCsvWs";
import SourceCreateGoogle from "./SourceCreateGoogle";
import SourceCreateLdap from "./SourceCreateLdap";
import SourceCreateOffice from "./SourceCreateOffice";
import SourceCreatePersonal from "./SourceCreatePersonal";
import SourceCreatePhonebook from "./SourceCreatePhonebook";
import SourceCreateWazo from "./SourceCreateWazo";

import { useApis } from "../../../../ApiProvider";

const SourceCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { backendsSourceAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  const [typeIsSelected, setTypeIsSelected] = useState(false);
  const [sourceType, setSourceType] = useState("");

  const typeOptions = ["conference", "csv", "csv_ws", "google", "ldap", "office365", "personal", "phonebook", "wazo"];

  // resource
  const [source, setSource] = useState({
    auth: {
    },
    confd: {},
    first_matched_columns: [],
    format_columns: {
    },
    name: null,
    searched_columns: [],
  });

  const handleSelectType = (e) => {
    setSourceType(e.target.value);
    setTypeIsSelected(true);
  };

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await backendsSourceAdd(sourceType, source);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("sources");
    }
  };

  return (
    <TemplatePage
      title={t("sources.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"sources"}
      submit={submit}
      isCreate={typeIsSelected}
      hasTabs
      errors={errors}
      loading={loading}
    >
      {!typeIsSelected && (
        <Flex flexDirection="column" alignContent="center">
          <Box textAlign="center" my="4">
            <Text>{t("sources.source_type")} :</Text>
          </Box>
          <Flex gap="4" justifyContent="center">
            {typeOptions.map((item, index) => (
              <Button colorPalette="primary" key={index} value={item} onClick={(e) => handleSelectType(e)}>
                {item}
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
      {sourceType === "conference" && (
        <SourceCreateConference source={source} setSource={setSource}/>
      )}
      {sourceType === "csv" && (
        <SourceCreateCsv source={source} setSource={setSource}/>
      )}
      {sourceType === "csv_ws" && (
        <SourceCreateCsvWs source={source} setSource={setSource}/>
      )}
      {sourceType === "google" && (
        <SourceCreateGoogle source={source} setSource={setSource}/>
      )}
      {sourceType === "ldap" && (
        <SourceCreateLdap source={source} setSource={setSource}/>
      )}
      {sourceType === "office365" && (
        <SourceCreateOffice source={source} setSource={setSource}/>
      )}
      {sourceType === "personal" && (
        <SourceCreatePersonal source={source} setSource={setSource}/>
      )}
      {sourceType === "phonebook" && (
        <SourceCreatePhonebook source={source} setSource={setSource}/>
      )}
      {sourceType === "wazo" && (
        <SourceCreateWazo source={source} setSource={setSource}/>
      )}
    </TemplatePage>
  );
};

export default SourceCreate;
