import { useState } from "react";

export const useLdap = ({ apiClient }) => {
    
  // values
  const [ldap, setLdap] = useState({});

  // functions
  const ldapGet = async () => {
    const ldapInfos = await apiClient.client.get("auth/0.1/backends/ldap");
    setLdap(ldapInfos);
  };

  return { ldap, setLdap, ldapGet };
};
