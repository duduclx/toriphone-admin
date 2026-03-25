import { useState, useEffect } from "react";
import { Box, Button, Field, IconButton, Text, HStack } from "@chakra-ui/react";
import { InputUi } from "../../../ui";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TenantDomains = ({ tenant, setTenant }) => {
  // requirements
  const { t } = useTranslation("admin");

  const [domains, setDomains] = useState(tenant.domain_names || []);

  useEffect(() => {
    setTenant((prev) => ({
      ...prev,
      domain_names: domains,
    }));
  }, [domains, setTenant]);

  const handleAdd = () => {
    setDomains((prevDomains) => [...prevDomains, ""]);
  };

  const handleRemove = (index) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const handleChange = (index, value) => {
    const updated = domains.map((domain, i) => (i === index ? value : domain));
    setDomains(updated);
  };

  return (
    <Box width="100%" mx="auto" my="4">
      <HStack justifyContent="space-between" mb={2} align="center" mr="14">
        <Text>{t("tenants.domain_title")} :</Text>
      </HStack>
      {domains.map((domain, index) => (
        <HStack key={index} gap={4} mb={2} align="top">
          <Field.Root invalid={!/^[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,3}$/.test(domain)}>
            <InputUi
              placeholder={t("tenants.domain_helper")}
              value={domain}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <Field.ErrorText >{t("tenants.invalid_domain")}</Field.ErrorText >
          </Field.Root>
          <IconButton colorPalette="danger" onClick={() => handleRemove(index)} >
            <FaTrashAlt />
          </IconButton>
        </HStack>
      ))}
      <Button colorPalette="primary" onClick={handleAdd} mt="4">
        <FaPlus /> {t("tenants.domain_add")}
      </Button>
    </Box>
  );
};

export default TenantDomains;
