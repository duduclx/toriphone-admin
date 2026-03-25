import { Flex, Field, Tabs, Text } from "@chakra-ui/react";
import { CheckboxUi, ButtonAddUi, IconButtonTrashUi, InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import TrunkContextForm from "../forms/TrunkContextForm";
import FormContainer from "../../../templates/forms/FormContainer";
import iaxOptions from "../helpers/TrunkIaxOptions";
import hostOptions from "../helpers/TrunkHostOptions";
import typeOptions from "../helpers/TrunkTypeOptions";

const TrunkIaxForm = ({ trunk, setTrunk, context, setContext }) => {
  // requirements
  const { t } = useTranslation("admin");

  const addOption = () => {
    setTrunk({
      ...trunk,
      endpoint_iax: {
        ...trunk.endpoint_iax,
        options: [...trunk.endpoint_iax.options, [iaxOptions[0], ""]],
      },
    });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = trunk.endpoint_iax.options.map((option, idx) =>
      idx === index ? (field === "key" ? [value, option[1]] : [option[0], value]) : option
    );
    setTrunk({
      ...trunk,
      endpoint_iax: {
        ...trunk.endpoint_iax,
        options: newOptions,
      },
    });
  };

  const removeOption = (index) => {
    const newOptions = trunk.endpoint_iax.options.filter((_, idx) => idx !== index);
    setTrunk({
      ...trunk,
      endpoint_iax: {
        ...trunk.endpoint_iax,
        options: newOptions,
      },
    });
  };

  return (
    <Tabs.Root defaultValue="trunk">
      <Tabs.List>
        <Tabs.Trigger value="trunk">{t("trunks.trunk")}</Tabs.Trigger>
        <Tabs.Trigger value="register">{t("trunks.register")}</Tabs.Trigger>
        <Tabs.Trigger value="options">{t("common.options")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="trunk">
        <FormContainer>
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              required
              placeholder={t("common.name")}
              value={trunk.endpoint_iax.name || ""}
              onChange={(e) =>
                setTrunk({
                  ...trunk,
                  endpoint_iax: {
                    ...trunk.endpoint_iax,
                    name: e.target.value,
                  },
                })
              }
            />
          </Field.Root>
          <TrunkContextForm context={context} setContext={setContext} />
          <Field.Root>
            <Field.Label>{t("common.host")} :</Field.Label>
            <NativeSelectUi
              onChange={(e) => {
                setTrunk({
                  ...trunk,
                  endpoint_iax: {
                    ...trunk.endpoint_iax,
                    host: e.target.value,
                  },
                });
              }}
            >
              {hostOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.type")} :</Field.Label>
            <NativeSelectUi
              onChange={(e) => {
                setTrunk({
                  ...trunk,
                  endpoint_iax: {
                    ...trunk.endpoint_iax,
                    type: e.target.value,
                  },
                });
              }}
            >
              {typeOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="register">
        <FormContainer>
          <CheckboxUi
            checked={trunk.register_iax}
            onCheckedChange={(e) =>
              setTrunk({
                ...trunk,
                register_iax: e.target.checked,
              })
            }
          >
            {t("common.enabled")}
          </CheckboxUi>
          {trunk.register_iax && (
            <>
              <Field.Root>
                <Field.Label>{t("trunks.auth_username")} :</Field.Label>
                <InputUi
                  value={trunk.register?.auth_username || ""}
                  placeholder={t("trunks.auth_username")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        auth_username: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("trunks.auth_password")} :</Field.Label>
                <InputUi
                  value={trunk.register?.auth_password || ""}
                  placeholder={t("trunks.auth_password")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        auth_password: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("trunks.callback_context")} :</Field.Label>
                <InputUi
                  value={trunk.register?.callback_context || ""}
                  placeholder={t("trunks.callback_context")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        callback_context: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("trunks.callback_extension")} :</Field.Label>
                <InputUi
                  value={trunk.register?.callback_extension || ""}
                  placeholder={t("trunks.callback_extension")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        callback_extension: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("trunks.remote_host")} :</Field.Label>
                <InputUi
                  value={trunk.register?.remote_host || ""}
                  placeholder={t("trunks.remote_host")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        remote_host: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t("trunks.remote_port")} :</Field.Label>
                <InputUi
                  value={trunk.register?.remote_port || ""}
                  placeholder={t("trunks.remote_port")}
                  onChange={(e) =>
                    setTrunk({
                      ...trunk,
                      register: {
                        ...trunk.register,
                        remote_port: e.target.value,
                      },
                    })
                  }
                />
              </Field.Root>
            </>
          )}
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="options">
        <FormContainer>
          <Flex justifyContent="space-around">
            <Text>{t("common.key")}</Text>
            <Text>{t("common.value")}</Text>
          </Flex>
          {trunk.endpoint_iax.options.map((option, index) => (
            <Flex key={index} gap="4">
              <IconButtonTrashUi onClick={() => removeOption(index)} />
              <NativeSelectUi value={option[0]} onChange={(e) => handleOptionChange(index, "key", e.target.value)}>
                {iaxOptions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </NativeSelectUi>
              <InputUi value={option[1]} onChange={(e) => handleOptionChange(index, "value", e.target.value)} />
            </Flex>
          ))}
          <ButtonAddUi text={t("common.add_option")} onClick={addOption} />
          <Field.Root>
            <Field.HelperText>{t("trunks.options_helper")}</Field.HelperText>
          </Field.Root>
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TrunkIaxForm;
