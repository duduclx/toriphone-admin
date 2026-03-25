import { useEffect } from "react";
import { Flex, Field, Tabs, Box } from "@chakra-ui/react";
import { ButtonAddUi, IconButtonTrashUi, InputUi, NumberInputUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import FormContainer from "../../../templates/forms/FormContainer";
import SoundForm from "../../../helpers/forms/SoundForm";
import DestinationsForm from "../../../helpers/DestinationsForm";

const IvrForm = ({
  ivr,
  setIvr,
  menusound,
  setMenusound,
  greetingsound,
  setGreetingsound,
  invalidsound,
  setInvalidsound,
  abortsound,
  setAbortsound,
  abortDestination,
  setAbortDestination,
  invalidDestination,
  setInvalidDestination,
  timeoutDestination,
  setTimeoutDestination,
}) => {
  // requirements
  const { t } = useTranslation("admin");

  // max tries
  const handleTriesChange = (e) => {
    setIvr((prev) => ({
        ...prev,
        max_tries: e.value === "" ? null : e.value,
      }));
  };

  // timeout
  const handleTimeoutChange = (e) => {
    setIvr((prev) => ({
        ...prev,
        timeout: e.value === "" ? null : e.value,
      }));
  };

  // choices
  const handleChoiceChange = (index, field, value) => {
    const updatedChoices = ivr.choices.map((choice, idx) => (idx === index ? { ...choice, [field]: value } : choice));
    setIvr({ ...ivr, choices: updatedChoices });
  };

  const addChoice = () => {
    setIvr({
      ...ivr,
      choices: [...ivr.choices, { exten: "", destination: null }],
    });
  };

  const removeChoice = (index) => {
    setIvr({
      ...ivr,
      choices: ivr.choices.filter((_, idx) => idx !== index),
    });
  };

  // menusound
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      menu_sound: menusound?.value || null,
    }));
  }, [menusound]);

  // greetingsound
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      greeting_sound: greetingsound?.value || null,
    }));
  }, [greetingsound]);

  // invalidsound
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      invalid_sound: invalidsound?.value || null,
    }));
  }, [invalidsound]);

  // abortsound
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      abort_sound: abortsound?.value || null,
    }));
  }, [abortsound]);

  // abortDestination
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      abort_destination: abortDestination,
    }));
  }, [abortDestination]);

  // invalidDestination
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      invalid_destination: invalidDestination,
    }));
  }, [invalidDestination]);

  // timeoutDestination
  useEffect(() => {
    setIvr((prev) => ({
      ...prev,
      timeout_destination: timeoutDestination,
    }));
  }, [timeoutDestination]);

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("common.general")}</Tabs.Trigger>
        <Tabs.Trigger value="ivr">{t("ivrs.menu_interactive")}</Tabs.Trigger>
        <Tabs.Trigger value="choice">{t("common.choice_invalid")}</Tabs.Trigger>
        <Tabs.Trigger value="timeout">{t("common.timeout")}</Tabs.Trigger>
        <Tabs.Trigger value="abort">{t("common.abort")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={ivr.name}
              onChange={(e) => setIvr({ ...ivr, name: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.description")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.description")}
              value={ivr.description}
              onChange={(e) => setIvr({ ...ivr, description: e.target.value })}
            />
          </Field.Root>
          <SoundForm
            label={t("ivrs.sound_greeting")}
            sound={greetingsound}
            setSound={setGreetingsound}
            helperText={t("ivrs.sound_greeting_helper")}
          />
          <SoundForm
            label={t("ivrs.sound_menu")}
            sound={menusound}
            setSound={setMenusound}
            helperText={t("ivrs.sound_menu_helper")}
          />
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="ivr">
        <Field.Root>
          <Field.Label>{t("common.choice")} :</Field.Label>
          <FormContainer>
            {ivr.choices?.map((choice, index) => (
              <Flex
                key={index}
                flexDirection="column"
                gap="4"
                mb="4"
                background="bgElevated"
                borderRadius="12"
                p="8"
              >
                <Field.Root>
                  <Field.Label>{t("common.extension")} :</Field.Label>
                  <InputUi
                    required
                    placeholder={t("common.extension")}
                    value={choice.exten}
                    onChange={(e) => handleChoiceChange(index, "exten", e.target.value)}
                  />
                </Field.Root>
                <DestinationsForm
                  label={t("common.destination")}
                  newDestination={choice.destination}
                  setNewDestination={(value) => handleChoiceChange(index, "destination", value)}
                />
                <Box width="100%" textAlign="right">
                  <IconButtonTrashUi onClick={() => removeChoice(index)} />
                </Box>
              </Flex>
            ))}
            <ButtonAddUi text={t("common.choice_add")} onClick={addChoice} />
          </FormContainer>
        </Field.Root>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="choice">
        <FormContainer alignSelf="center" justifyContent="center">
          <DestinationsForm
            label={t("ivrs.invalid_destination")}
            newDestination={invalidDestination}
            setNewDestination={setInvalidDestination}
            helperText={t("ivrs.invalid_destination_helper")}
          />
          <SoundForm
            label={t("ivrs.sound_invalid")}
            sound={invalidsound}
            setSound={setInvalidsound}
            helperText={t("ivrs.sound_invalid_helper")}
          />
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="timeout">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.timeout")} :</Field.Label>
            <NumberInputUi
              min={0}
              value={ivr.timeout === null ? "" : ivr.timeout}
              allowMouseWheel
              onValueChange={handleTimeoutChange}
            />
            <Field.HelperText>{t("ivrs.timeout_helper")}</Field.HelperText>
          </Field.Root>
          <DestinationsForm
            label={t("ivrs.timeout_destination")}
            newDestination={timeoutDestination}
            setNewDestination={setTimeoutDestination}
            helperText={t("ivrs.timeout_destination_helper")}
          />
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="abort">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("ivrs.max_tries")} :</Field.Label>
            <NumberInputUi
              min={0}
              value={ivr.max_tries === null ? "" : ivr.max_tries}
              allowMouseWheel
              onValueChange={handleTriesChange}
            />
            <Field.HelperText>{t("ivrs.max_tries_helper")}</Field.HelperText>
          </Field.Root>
          <DestinationsForm
            label={t("ivrs.abort_destination")}
            newDestination={abortDestination}
            setNewDestination={setAbortDestination}
            helperText={t("ivrs.abort_destination_helper")}
          />
          <SoundForm
            label={t("ivrs.sound_abort")}
            sound={abortsound}
            setSound={setAbortsound}
            helperText={t("ivrs.sound_abort_helper")}
          />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default IvrForm;
