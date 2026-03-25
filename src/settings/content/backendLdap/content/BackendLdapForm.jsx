import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Field,
  Button,
  Dialog,
  useDisclosure,
  Steps,
  useSteps,
  Spinner,
  ButtonGroup,
} from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { toaster } from "../../../../components/ui/toaster";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import Errors from "../../../templates/errors/Errors";
import FormContainer from "../../../templates/forms/FormContainer";

const BackendLdapForm = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // stepper
  const steps = [
    { title: t("backendLdap.one.step_title"), description: t("backendLdap.one.step_subTitle") },
    { title: t("backendLdap.two.step_title"), description: t("backendLdap.two.step_subTitle") },
    { title: t("backendLdap.three.step_title"), description: t("backendLdap.three.step_subTitle") },
  ];
  const [step, setStep] = useState(0);

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  // api
  const { backendLdap, setBackendLdap, backendLdapGet, backendLdapEdit, backendLdapDelete } = useApis();

  useEffect(() => {
    backendLdapGet();
  }, []);

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // value
  const [ldap, setLdap] = useState({});

  // options
  const protocalSecurity = [
    { label: t("backendLdap.protocol_security_none"), value: null },
    { label: "TLS", value: "tls" },
    { label: "LDAPS", value: "ldaps" },
  ];
  const protocolVersions = [2, 3];

  // update ldap config
  useEffect(() => {
    if (backendLdap) {
      setLdap({
        ...backendLdap,
        protocol_security: backendLdap.protocol_security || null,
        protocol_version: backendLdap.protocol_version || 2,
      });
    }
  }, [backendLdap]);

  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await backendLdapEdit(ldap);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.error.reason[0] });
    } else {
      setBackendLdap(ldap);
      setLoading(false);
      toaster.create({
        type: "success",
        title: t("backendLdap.success.title"),
        description: t("backendLdap.success.description"),
        duration: 3000,
        closable: true,
      });
      setSelectedComponent("backends");
    }
  };

  const submitCancel = () => {
    setSelectedComponent("backends");
  };

  const submitDelete = async () => {
    setErrors(null);
    setLoading(false);
    const res = await backendLdapDelete();
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.error.reason[0] });
    } else {
      await backendLdapGet();
      setLoading(false);
      setLdap({
        host: "",
        port: "",
        protocol_version: protocolVersions[0],
        protocol_security: protocalSecurity[0].value,
        bind_dn: "",
        user_base_dn: "",
        user_login_attribute: "",
        user_email_attribute: "",
        search_filters: "",
      });
      onClose();
      toaster.create({
        type: "success",
        title: t("backendLdap.reset.title"),
        description: t("backendLdap.reset.description"),
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <>
      {ldap && (
        <Flex flexDirection="column" pt="12" px="12" flex="1" height="90vh">
          <Steps.Root colorPalette="cyan" step={step} onStepChange={(e) => setStep(e.step)} count={steps.length} mb="8">
            <Steps.List>
              {steps.map((step, index) => (
                <Steps.Item key={index} index={index} title={step.title}>
                  <Steps.Indicator />

                  <Box flexShrink="0">
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Description>{step.description}</Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>
            <Steps.Content index={0}>
              <Flex flex="1" flexDirection="column">
                <FormContainer alignSelf="center" justifyContent="center" width="80%">
                  <Box textAlign="center">
                    <Text as="h3">{t("backendLdap.one.title")}</Text>
                    <Text>{t("backendLdap.one.subTitle")}</Text>
                  </Box>
                  <Flex justifyContent="space-between">
                    <Field.Root width="60%">
                      <Field.Label>{t("common.host")} :</Field.Label>
                      <InputUi
                        required
                        placeholder={t("common.host")}
                        value={ldap.host}
                        onChange={(e) => setLdap({ ...ldap, host: e.target.value })}
                      />
                      <Field.HelperText>{t("backendLdap.one.host_help")}</Field.HelperText>
                    </Field.Root>
                    <Field.Root width="30%">
                      <Field.Label>{t("common.port")} :</Field.Label>
                      <InputUi
                        required
                        placeholder={t("common.port")}
                        value={ldap.port}
                        onChange={(e) => setLdap({ ...ldap, port: e.target.value })}
                      />
                      <Field.HelperText>{t("backendLdap.one.port_help")}</Field.HelperText>
                    </Field.Root>
                  </Flex>
                  <Field.Root>
                    <Field.Label>{t("backendLdap.one.user_base_dn")} :</Field.Label>
                    <InputUi
                      required
                      placeholder={t("backendLdap.one.user_base_dn")}
                      value={ldap.user_base_dn}
                      onChange={(e) => setLdap({ ...ldap, user_base_dn: e.target.value })}
                    />
                    <Field.HelperText>{t("backendLdap.one.user_base_dn_help")}</Field.HelperText>
                  </Field.Root>
                  <Flex justifyContent="space-between">
                    <Field.Root width="60%">
                      <Field.Label>{t("backendLdap.one.protocol_security")} :</Field.Label>
                      <NativeSelectUi
                        value={ldap.protocol_security ?? ""}
                        onChange={(e) => setLdap({ ...ldap, protocol_security: e.target.value === "" ? null : e.target.value })}
                      >
                        {protocalSecurity.map((secu, index) => (
                          <option key={index} value={secu.value === null ? "" : secu.value}>
                            {secu.label}
                          </option>
                        ))}
                      </NativeSelectUi>
                    </Field.Root>
                    <Field.Root width="30%">
                      <Field.Label>{t("backendLdap.one.protocol_version")} :</Field.Label>
                      <NativeSelectUi
                        value={ldap.protocol_version}
                        onChange={(e) => setLdap({ ...ldap, protocol_version: e.target.value })}
                      >
                        {protocolVersions.map((version, index) => (
                          <option key={index}>{version}</option>
                        ))}
                      </NativeSelectUi>
                    </Field.Root>
                  </Flex>
                </FormContainer>
              </Flex>
            </Steps.Content>
            <Steps.Content index={1}>
              <Flex flex="1" flexDirection="column">
                <FormContainer alignSelf="center" width="80%">
                  <Box textAlign="center">
                    <Text as="h3">{t("backendLdap.two.title")}</Text>
                    <Text>{t("backendLdap.two.subTitle")}</Text>
                  </Box>
                  <Field.Root>
                    <Field.Label>{t("backendLdap.two.bind_dn")} :</Field.Label>
                    <InputUi
                      required
                      placeholder={t("backendLdap.two.bind_dn")}
                      value={ldap.bind_dn}
                      onChange={(e) => setLdap({ ...ldap, bind_dn: e.target.value })}
                    />
                    <Field.HelperText>{t("backendLdap.two.bind_dn_help")}</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("common.password")} :</Field.Label>
                    <InputUi
                      required
                      placeholder={t("backendLdap.two.bind_password")}
                      value={ldap.bind_password}
                      onChange={(e) => setLdap({ ...ldap, bind_password: e.target.value })}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t("backendLdap.two.search_filter")} :</Field.Label>
                    <InputUi
                      required
                      placeholder={t("backendLdap.two.search_filter")}
                      value={ldap.search_filters}
                      onChange={(e) => setLdap({ ...ldap, search_filters: e.target.value })}
                    />
                    <Field.HelperText>
                      {t("backendLdap.two.search_filter_help")} <code>{"{user_login_attribute}={username}"}</code>
                    </Field.HelperText>
                  </Field.Root>
                </FormContainer>
              </Flex>
            </Steps.Content>
            <Steps.Content index={2}>
              <Flex flex="1" flexDirection="column">
                <Box position="relative" alignSelf="center" width="80%">
                  {loading && (
                    <Flex
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      zIndex={10}
                      align="center"
                      justify="center"
                    >
                      <Spinner size="xl" />
                    </Flex>
                  )}
                  <FormContainer>
                    <Box textAlign="center">
                      <Text as="h3">{t("backendLdap.three.title")}</Text>
                      <Text>{t("backendLdap.three.subTitle")}</Text>
                    </Box>
                    <Field.Root>
                      <Field.Label>{t("backendLdap.three.user_login_attribute")} :</Field.Label>
                      <InputUi
                        required
                        placeholder={t("backendLdap.three.user_login_attribute")}
                        value={ldap.user_login_attribute}
                        onChange={(e) => setLdap({ ...ldap, user_login_attribute: e.target.value })}
                      />
                      <Field.HelperText>{t("backendLdap.three.user_login_attribute_help")}</Field.HelperText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>{t("backendLdap.three.user_email_attribute")} :</Field.Label>
                      <InputUi
                        required
                        placeholder={t("backendLdap.three.user_email_attribute")}
                        value={ldap.user_email_attribute}
                        onChange={(e) => setLdap({ ...ldap, user_email_attribute: e.target.value })}
                      />
                      <Field.HelperText>{t("backendLdap.three.user_email_attribute_help")}</Field.HelperText>
                    </Field.Root>
                  </FormContainer>
                </Box>
              </Flex>
            </Steps.Content>
          </Steps.Root>
          {errors && <Errors errors={errors} />}
          <Flex flex="1" flexDirection="column" justifyContent="flex-end" p="4">
            <Flex>
              <ButtonGroup w="100%">
                {step === 0 ? (
                  <Button colorPalette="danger" onClick={() => submitCancel()} disabled={loading}>
                    {t("common.cancel")}
                  </Button>
                ) : (
                  <Button colorPalette="danger" onClick={() => setStep((prev) => prev - 1)} disabled={loading}>
                    {t("common.previous")}
                  </Button>
                )}

                {step === 2 ? (
                  <Button ml="auto" colorPalette="primary" onClick={() => submit()} disabled={loading}>
                    {t("common.add")}
                  </Button>
                ) : (
                  <Button
                    colorPalette="secondary"
                    ml="auto"
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={loading}
                  >
                    {t("common.next")}
                  </Button>
                )}
              </ButtonGroup>
            </Flex>
          </Flex>
        </Flex>
      )}
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="bgDefault">
            <Dialog.Header alignSelf="center">
              <Dialog.Title>{t("backendLdap.delete.title")}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Text>{t("backendLdap.delete.subTitle")}</Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Button colorPalette="danger" onClick={() => submitDelete()} disabled={loading}>
                {t("common.delete")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default BackendLdapForm;
