import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import useProtocolOptions from "../../../helpers/ProtocolOptions";

import LineCreateCustom from "./LineCreateCustom";
import LineCreateSccp from "./LineCreateSccp";
import LineCreateSip from "./LineCreateSip";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

const LineCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { contextsGet, lineAdd } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  const [protocolIsSelected, setProtocolIsSelected] = useState(false);
  const handleSelectProtocol = (e) => {
    setLineType(e.target.value);
    setProtocolIsSelected(true);
  };

  const { protocolOptions } = useProtocolOptions();

  const [contextsOptions, setContextsOptions] = useState(null);

  useEffect(() => {
    const fetchContext = async () => {
      const res = await contextsGet();
      const internals = res.items.filter((item) => item.type === "internal");
      setContextsOptions(internals);
    };
    fetchContext();
  }, []);

  useEffect(() => {
    if (contextsOptions) {
      setLine({
        ...line,
        context: contextsOptions[0]?.name,
      });
    }
  }, [contextsOptions]);

  const [lineType, setLineType] = useState("sip");

  const initialOptions = {
    aor_section_options: [],
    auth_section_options: [],
    endpoint_section_options: [],
    identify_section_options: [],
    outbound_auth_section_options: [],
    registration_outbound_auth_section_options: [],
    registration_section_options: [],
  };

  // resource
  const [line, setLine] = useState({
    //caller_id_name: "",
    protocol: "sip",
    //position: 1,
    //registar: "default",
    //application: null,
    context: null,
    //device_id: null,
    endpoint_custom: null,
    endpoint_sccp: { options: [] },
    endpoint_sip: initialOptions,
    //extensions: [],
  });

  useEffect(() => {
    if (lineType === "sip") {
      setLine({
        context: line.context,
        caller_id_name: "",
        protocol: "sip",
        endpoint_sip: initialOptions,
        extensions: [],
      });
    }
    if (lineType === "custom") {
      setLine({
        context: line.context,
        protocol: "custom",
        endpoint_custom: {
          interface: null,
        },
      });
    }
    if (lineType === "sccp") {
      setLine({
        context: line.context,
        protocol: "sccp",
        endpoint_sccp: {
          options: [],
        },
      });
    }
  }, [lineType]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await lineAdd(line);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("lines");
    }
  };

  return (
    <TemplatePage
      title={t("lines.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"lines"}
      submit={submit}
      isCreate={protocolIsSelected}
      hasTabs={lineType === "sip" ? true : false}
      errors={errors}
      loading={loading}
    >
      {!protocolIsSelected && (
        <Flex flexDirection="column" alignContent="center">
          <Box textAlign="center" my="4">
            <Text>{t("lines.protocol_select")} :</Text>
          </Box>
          <Flex gap="4" justifyContent="center">
            {protocolOptions.map((item, index) => (
              <Button colorPalette="primary" key={index} value={item.value} onClick={(e) => handleSelectProtocol(e)}>
                {item.label}
              </Button>
            ))}
          </Flex>
        </Flex>
      )}
      {protocolIsSelected && lineType === "sip" && (
        <LineCreateSip contextsOptions={contextsOptions} line={line} setLine={setLine} />
      )}
      {protocolIsSelected && lineType === "sccp" && (
        <LineCreateSccp contextsOptions={contextsOptions} line={line} setLine={setLine} />
      )}
      {protocolIsSelected && lineType === "custom" && (
        <LineCreateCustom contextsOptions={contextsOptions} line={line} setLine={setLine} />
      )}
    </TemplatePage>
  );
};

export default LineCreate;
