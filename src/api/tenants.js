import { useState } from "react";
import { useAuth } from "toriphone-auth";

/*
this is to select the current tenant
and pass it to provider components

i should have a function to set to default value each values in list table
*/

const useTenants = ({ apiClient }) => {

  // dependencies
  const { user } = useAuth();

  // values
  const [tenants, setTenants] = useState({})
  const [tenantCurrent, setTenantCurrent] = useState({})

  // functions
  const tenantsGet = async () => {
    const res = await apiClient.client.get("auth/0.1/tenants");
    setTenants(res)
    //const master = res.items.find(item => item.name === "master");
    //setTenantCurrent(master)
    const myTenant = res.items.find((tenant) => tenant.uuid === user.tenantUuid);
    setTenantCurrent(myTenant)
    return res;
  };

  return {
    tenants,
    setTenants,
    tenantCurrent,
    setTenantCurrent,
    tenantsGet
  }
}

export default useTenants
