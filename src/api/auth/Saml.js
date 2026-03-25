
export const useSaml = ({ apiClient }) => {

  // functions
  const samlAcs = async (acs) => {
    const res = await apiClient.client.post(`auth/0.1/saml/acs`, acs);
    return res;
  };

  const samlSso = async (sso) => {
    const res = await apiClient.client.post(`auth/0.1/saml/sso`, sso);
    return res;
  }

  return {
    samlAcs,
    samlSso
  };
};
