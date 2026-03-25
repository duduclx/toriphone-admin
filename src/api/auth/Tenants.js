import { useState } from "react";

export const useAuthTenants = ({tenantsGet, apiClient}) => {

  // values
  const [authTenants, setAuthTenants] = useState({});
  const [authTenantSelected, setAuthTenantSelected] = useState({});
  const [authTenantDomains, setAuthTenantDomains] = useState({});

  // functions
  const authTenantsGet = async () => {
    const res = await apiClient.client.get("auth/0.1/tenants");
    setAuthTenants(res);
    return res;
  };

  const authTenantsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`auth/0.1/tenants?limit=${limit}&offset=${offset}&search=${search}`);
      setAuthTenants(res);
      return res;
    } else {
      const res = await apiClient.client.get(`auth/0.1/tenants?limit=${limit}&offset=${offset}`);
      setAuthTenants(res);
      return res;
    }
  }

  const authTenantGet = async (tenant) => {
    const tenantUuid = tenant.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/tenants/${tenantUuid}`);
      return res;
    } catch (e) {
      return e
    }
  };

  const authTenantAdd = async (tenant) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/tenants`, tenant);
      await tenantsGet();
      return res;
    } catch (e) {
      return e
    }
  };

  const authTenantEdit = async (tenant) => {
    const tenantUuid = tenant.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/tenants/${tenantUuid}`, tenant);
      return res
    } catch (e) {
      return e
    }
  };

  const authTenantDelete = async (tenant) => {
    const tenantUuid = tenant.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/tenants/${tenantUuid}`);
      await tenantsGet();
      return res;
    } catch (e) {
      return e;
    }
  };

  const authTenantDomainGet = async (tenant) => {
    const tenantUuid = tenant.uuid;
    try {
      const res = await apiClient.client.get(`auth/0.1/tenants/${tenantUuid}/domains`);
      setAuthTenantDomains(res);
      return res;
    } catch (e) {
      return e
    }
  }

  return {
    authTenants,
    setAuthTenants,
    authTenantSelected,
    setAuthTenantSelected,
    authTenantsGet,
    authTenantsPageGet,
    authTenantGet,
    authTenantAdd,
    authTenantEdit,
    authTenantDelete,
    authTenantDomains,
    setAuthTenantDomains,
    authTenantDomainGet,
  };
};
