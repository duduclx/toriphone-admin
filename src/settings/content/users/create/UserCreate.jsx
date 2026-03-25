import { useState, useEffect } from "react";
import { Alert, Box, Button, ButtonGroup, Steps, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

import UserCreateStepOne from "./UserCreateStepOne";
import UserCreateStepTwo from "./UserCreateStepTwo";
import UserCreateStepThree from "./UserCreateStepThree";

const UserCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const {
    contexts,
    endpointsSipTemplatesAll,
    endpointsSipTemplatesGet,
    policiesAll,
    policiesGet,
    authUserPoliciesAssociate,
    userCreate,
    lineCreate,
    userLineAssociate,
    contextRangeGet,
    userCreateVoicemail,
    authUserSearch,
  } = useApis();

  // stepper
  const steps = [
    { title: t("users.create.step_user"), description: t("users.create.step_user_comment") },
    { title: t("users.create.step_line"), description: t("users.create.step_line_comment") },
    { title: t("users.create.step_configuration"), description: t("users.create.step_configuration_comment") },
  ];
  const [step, setStep] = useState(0);

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    subscription_type: 10,
  });

  const [emailError, setEmailError] = useState(false);

  // check if required form are valid
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const isValidFirstname = newUser.firstname.length > 1;
    const isValidLastname = newUser.lastname.length > 1;
    const isValidEmail = newUser.email.length > 1 && !emailError;
    const isValidPassword = newUser.password.length > 4

    if (isValidFirstname && isValidLastname && isValidEmail && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [newUser, emailError]);

  const [emailExist, setEmailExist] = useState(false);

  // bloquer la possibilité de créer des contexts, et permettre que l'édition
  // ainsi, il n'existe que le type "internal"
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};

  const [selectedContext, setSelectedContext] = useState(initialContext);

  const [policieAdmin, setPolicieAdmin] = useState({});

  const [extension, setExtension] = useState("");

  /*
  const [sipTemplate, setSipTemplate] = useState(endpointsSipTemplates.items.find((item) => item.label === "webrtc"));

  const [line, setLine] = useState({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    sipTemplate: {
      label: sipTemplate.label,
      uuid: sipTemplate.uuid,
    },
    extensions: {
      context: selectedContext,
      exten: extension,
    },
  });
  */

  const [sipTemplate, setSipTemplate] = useState(null);
  const [line, setLine] = useState(null);

  const [addPolicie, setAddPolicie] = useState(false);
  const [addVoicemail, setAddVoicemail] = useState(false);

  const [availableExtensions, setAvailableExtensions] = useState([]);

  // obtenir une liste d'extensions attribuables
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeGet(initialContext.id);

      if (range.items) {
        const available = [];
        range.items.forEach((item) => {
          const start = parseInt(item.start);
          const end = parseInt(item.end);

          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              available.push(i);
            }
          }
        });
        setAvailableExtensions(available);
        setLine({
          ...line,
          extensions: {
            context: initialContext.name,
            exten: available[0],
          },
        });
      }
    };

    fetchContextRange();
    policiesGet();
    endpointsSipTemplatesGet();
  }, []);

  // sipTemplate (default webrtc)
  useEffect(() => {
    if (endpointsSipTemplatesAll.items.length > 0) {
      const template = endpointsSipTemplatesAll.items.find((item) => item.label === "webrtc");
      setSipTemplate(template);
    }
  }, [endpointsSipTemplatesAll]);

  // line
  useEffect(() => {
    if (sipTemplate && availableExtensions.length > 0) {
      setLine({
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        sipTemplate: {
          label: sipTemplate.label,
          uuid: sipTemplate.uuid,
        },
        extensions: {
          context: initialContext.name,
          exten: availableExtensions[0],
        },
      });
    }
  }, [sipTemplate, availableExtensions]);

  // policie
  useEffect(() => {
    const initialPolicie =
      policiesAll && policiesAll.items && policiesAll.items.length > 0
        ? policiesAll.items.find((policy) => policy.name === "wazo_default_admin_policy")
        : null;

    setPolicieAdmin(initialPolicie);
  }, [policiesAll]);

  // optionnel
  const protocoles = ["SIP", "SCCP", "CUSTOM"];

  const userAlreadyExist = async () => {
    const res = await authUserSearch(newUser.email);
    if (res.filtered >= 1) {
      return true;
    } else {
      return false;
    }
  };

  // submit 1
  const handleAddUserWithLine = async () => {
    setErrors(null);
    setLoading(true);
    const userExist = await userAlreadyExist();
    if (userExist) {
      setEmailExist(true);
      setLoading(false);
      return;
    } else {
      const createdUser = await userCreate(newUser);
      if (createdUser.error) {
        setLoading(false);
        setErrors({ title: createdUser.status, description: createdUser.message });
        return;
      }
      const createdLine = await lineCreate(line);
      if (createdLine.error) {
        setLoading(false);
        setErrors({ title: createdLine.status, description: createdLine.message });
        return;
      }
      const associated = userLineAssociate(createdUser, createdLine);
      if (associated.error) {
        setLoading(false);
        setErrors({ title: associated.status, description: associated.message });
        return;
      }

      if (addPolicie) {
        const asso = await authUserPoliciesAssociate(createdUser, policieAdmin);
        if (asso.error) {
          setLoading(false);
          setErrors({ title: asso.status, description: asso.message });
          return;
        }
      }

      if (addVoicemail) {
        const voice = await userCreateVoicemail(createdUser, createdLine);
        if (voice.error) {
          setLoading(false);
          setErrors({ title: voice.status, description: voice.message });
          return;
        }
      }
      setLoading(false);
      setSelectedComponent("users");
    }
  };

  // submit 2
  const handleAddUserOnly = async () => {
    setErrors(null);
    setLoading(false);
    const userExist = await userAlreadyExist();
    if (userExist) {
      setEmailExist(true);
      setLoading(false);
      return;
    } else {
      const res = await userCreate(newUser);
      if (res.error) {
        setLoading(false);
        setErrors({ title: res.status, description: res.message });
        return;
      }

      if (addPolicie) {
        const asso = await authUserPoliciesAssociate(res, policieAdmin);
        if (asso.error) {
          setLoading(false);
          setErrors({ title: asso.status, description: asso.message });
          return;
        }
      }
      setLoading(false);
      setSelectedComponent("users");
    }
  };

  return (
    <TemplatePage
      title={t("users.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"users"}
      hasTabs
      errors={errors}
      loading={loading}
    >
      <Flex flexDirection="column" pt="12" px="12" flex="1" height="90vh">
        <Steps.Root colorPalette="cyan" step={step} onStepChange={(e) => setStep(e.step)} count={steps.length}>
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Trigger>
                  <Steps.Indicator />

                  <Box flexShrink="0">
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Description>{step.description}</Steps.Description>
                  </Box>

                  <Steps.Separator />
                </Steps.Trigger>
              </Steps.Item>
            ))}
          </Steps.List>

          <Steps.Content index={0}>
            <UserCreateStepOne
              newUser={newUser}
              setNewUser={setNewUser}
              setLine={setLine}
              addPolicie={addPolicie}
              setAddPolicie={setAddPolicie}
              emailError={emailError}
              setEmailError={setEmailError}
            />
          </Steps.Content>
          <Steps.Content index={1}>
            <UserCreateStepTwo
              availableExtensions={availableExtensions}
              extension={extension}
              setExtension={setExtension}
              line={line}
              setLine={setLine}
            />
          </Steps.Content>
          <Steps.Content index={2}>
            <UserCreateStepThree addVoicemail={addVoicemail} setAddVoicemail={setAddVoicemail} />
          </Steps.Content>
        </Steps.Root>

        {emailExist && (
          <Alert.Root status="error" mt="4">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{t("users.create.email_already_exist")}</Alert.Title>
              <Alert.Description>{newUser.email}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <Flex flex="1" flexDirection="column" justifyContent="flex-end" p="4">
          <Flex>
            <ButtonGroup w="100%">
              {step === 0 ? (
                <Button colorPalette="primary" mr="4" onClick={() => handleAddUserOnly()} disabled={!isValid}>
                  {t("users.create.add_user_only")}
                </Button>
              ) : (
                <Button colorPalette="danger" mr={4} onClick={() => setStep((prev) => prev - 1)}>
                  {t("users.create.previous")}
                </Button>
              )}

              {step === 2 ? (
                <Button colorPalette="primary" ml="auto" onClick={() => handleAddUserWithLine()} disabled={!isValid}>
                  {t("users.create.add_user")}
                </Button>
              ) : (
                <Button colorPalette="secondary" ml="auto" onClick={() => setStep((prev) => prev + 1)}>
                  {t("users.create.next")}
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
    </TemplatePage>
  );
};

export default UserCreate;
