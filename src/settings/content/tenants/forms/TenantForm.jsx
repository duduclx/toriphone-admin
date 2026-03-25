import { Field, Tabs } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import TenantDomains from "./TenantDomains";
import TenantContact from "./TenantContact";
import TenantHelper from "../helpers/TenantHelper";
import FormContainer from "../../../templates/forms/FormContainer";

const TenantForm = ({ tenant, setTenant, isEdit = null }) => {
  // requirements
  const { t } = useTranslation("admin");

  // helper
  const { tenantAuthMethodOptions } = TenantHelper();

  return (
    <Tabs.Root defaultValue="general">
      <Tabs.List>
        <Tabs.Trigger value="general">{t("tenants.general")}</Tabs.Trigger>
        <Tabs.Trigger value="contact">{t("tenants.contact")}</Tabs.Trigger>
        <Tabs.Trigger value="domains">{t("tenants.domains")}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content width="50%" m="auto" value="general">
        <FormContainer alignSelf="center" justifyContent="center">
          <Field.Root>
            <Field.Label>{t("common.name")} :</Field.Label>
            <InputUi
              placeholder={t("common.name")}
              value={tenant.name}
              onChange={(e) => setTenant({ ...tenant, name: e.target.value })}
            />
          </Field.Root>
          {isEdit && (
            <Field.Root>
              <Field.Label>{t("tenants.slug")} :</Field.Label>
              <InputUi
                disabled
                placeholder={t("tenants.slug")}
                value={tenant.slug}
                onChange={(e) => setTenant({ ...tenant, slug: e.target.value })}
              />
            </Field.Root>
          )}
          <Field.Root>
            <Field.Label>{t("tenants.auth_method")} :</Field.Label>
            <NativeSelectUi
              value={tenant.default_authentication_method}
              onChange={(e) => {
                setTenant((prev) => ({
                  ...prev,
                  default_authentication_method: e.target.value,
                }));
              }}
            >
              {tenantAuthMethodOptions.map((auth, index) => (
                <option value={auth.value} key={index}>
                  {auth.label}
                </option>
              ))}
            </NativeSelectUi>
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="contact">
        <FormContainer alignSelf="center" justifyContent="center">
          {/*<TenantContact contact={contact} setContact={setContact} />*/}
          <Field.Root>
            <Field.Label>{t("tenants.contact")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.contact")}
              value={tenant.address?.state || ""}
              onChange={(e) =>
                setTenant({
                  ...tenant,
                  address: { ...tenant.address, state: e.target.value ? e.target.value : null },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("tenants.email")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.email")}
              value={tenant.address?.line_2 || ""}
              onChange={(e) =>
                setTenant({
                  ...tenant,
                  address: { ...tenant.address, line_2: e.target.value ? e.target.value : null },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("common.phone")} :</Field.Label>
            <InputUi
              placeholder={t("common.phone")}
              value={tenant.phone}
              onChange={(e) => setTenant({ ...tenant, phone: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("tenants.country")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.country")}
              value={tenant.country}
              onChange={(e) => setTenant({ ...tenant, country: e.target.value })}
            />
          </Field.Root>
          {/*
                <Field.Root>
                  <Field.Label>{t("tenants.state")} :</Field.Label>
                  <InputUi
                    placeholder={t("tenants.state")}
                    value={tenant.state}
                    onChange={(e) => setTenant({ ...tenant, state: e.target.value })}
                  />
                </Field.Root>
                */}
          <Field.Root>
            <Field.Label>{t("tenants.city")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.city")}
              value={tenant.city}
              onChange={(e) => setTenant({ ...tenant, city: e.target.value })}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("tenants.line_1")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.line_1")}
              value={tenant.address?.line_1 || ""}
              onChange={(e) =>
                setTenant({
                  ...tenant,
                  address: { ...tenant.address, line_1: e.target.value ? e.target.value : null },
                })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>{t("tenants.zip_code")} :</Field.Label>
            <InputUi
              placeholder={t("tenants.zip_code")}
              value={tenant.zip_code}
              onChange={(e) => setTenant({ ...tenant, zip_code: e.target.value })}
            />
          </Field.Root>
        </FormContainer>
      </Tabs.Content>

      <Tabs.Content width="50%" m="auto" value="domains">
        <FormContainer alignSelf="center" justifyContent="center">
          <TenantDomains tenant={tenant} setTenant={setTenant} />
        </FormContainer>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TenantForm;
