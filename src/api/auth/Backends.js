import { useState } from "react";

export const useBackends = ({ apiClient }) => {
  // values
  const [backends, setBackends] = useState({});
  const [backendLdap, setBackendLdap] = useState({});
  const [backendSaml, setBackendSaml] = useState({});

  // functions
  const backendsGet = async () => {
    const res = await apiClient.client.get("auth/0.1/backends");
    setBackends(res);
    return res;
  };

  const backendLdapGet = async () => {
    const res = await apiClient.client.get("auth/0.1/backends/ldap");
    setBackendLdap(res);
    return res;
  };

  const backendLdapEdit = async (ldap) => {
    try {
      const res = await apiClient.client.put(`auth/0.1/backends/ldap`, ldap);
      return res;
    } catch (e) {
      return e;
    }
  };

  const backendLdapDelete = async () => {
    try {
      const res = await apiClient.client.delete(`auth/0.1/backends/ldap`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const backendSamlGet = async () => {
    try {
      const res = await apiClient.client.get("auth/0.1/backends/saml");
      setBackendSaml(res);
      return res;
    } catch (e) {
      setBackendSaml({
        acs_url: null,
        domain_uuid: null,
        entity_id: null
      })
      return {
        acs_url: null,
        domain_uuid: null,
        entity_id: null
      }
    }
    
  };

  const backendSamlMetadataGet = async () => {
    const res = await apiClient.client.get("auth/0.1/backends/saml/metadata");
    return res;
  };

  const backendSamlUrlGet = async () => {
    const res = await apiClient.client.get("auth/0.1/backends/saml/acs_url_template");
    return res;
  };

  const backendSamlCreate = async (saml) => {
    // il faut uploader le fichier xml pour le champ metadata
    /*
    try {
      const res = await apiClient.client.post(`auth/0.1/backends/saml`, saml);
      return res;
    } catch (e) {
      return e;
    }
      */
    const formData = new FormData();
    formData.append("acs_url", saml.acs_url);
    formData.append("domain_uuid", saml.domain_uuid);
    formData.append("entity_id", saml.entity_id);
    formData.append("metadata", saml.metadata);
  
    const response = await fetch(
      `https://${apiClient.client.server}/api/auth/0.1/backends/saml`,
      {
        method: "POST",
        headers: {
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        },
        body: formData,
      }
    );

    return response
  };

  const backendSamlUpdate = async (saml) => {
    /*
    try {
      const res = await apiClient.client.put(`auth/0.1/backends/saml`, saml);
      return res;
    } catch (e) {
      return e;
    }
      */
    const formData = new FormData();
    formData.append("acs_url", saml.acs_url);
    formData.append("domain_uuid", saml.domain_uuid);
    formData.append("entity_id", saml.entity_id);
    formData.append("metadata", saml.metadata);
  
    const response = await fetch(
      `https://${apiClient.client.server}/api/auth/0.1/backends/saml`,
      {
        method: "PUT",
        headers: {
          "Wazo-Tenant": Wazo.Auth.session.tenantUuid,
          "X-Auth-Token": apiClient.client.token,
        },
        body: formData,
      }
    );

    return response
  };

  const backendSamlDelete = async () => {
    try {
      const res = await apiClient.client.delete(`auth/0.1/backends/saml`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    backends,
    setBackends,
    backendLdap,
    setBackendLdap,
    backendsGet,
    backendLdapGet,
    backendLdapEdit,
    backendLdapDelete,
    backendSaml,
    setBackendSaml,
    backendSamlGet,
    backendSamlMetadataGet,
    backendSamlUrlGet,
    backendSamlCreate,
    backendSamlUpdate,
    backendSamlDelete
  };
};
