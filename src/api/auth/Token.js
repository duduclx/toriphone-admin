
export const useToken = ({ apiClient }) => {

  // functions
  const tokensGet = async () => {
    const res = await apiClient.client.get("auth/0.1/tokens?recurse=false");
    return res;
  };

  const tokenGet = async (token) => {
    const res = await apiClient.client.get(`auth/0.1/token/${token}`);
    return res;
  };

  const tokenDelete = async (token) => {
    try {
      const res = await apiClient.client.delete(`auth/0.1/token/${token}`);
      return res;
    } catch (e) {
      return false;
    }
  };

  const tokenCheck = async (token) => {
    const res = await apiClient.client.head(`auth/0.1/token/${token}`);
    return res;
  };

  const tokenScopesCheck = async (token, scopes) => {
    const res = await apiClient.client.put(`auth/0.1/token/${token}`, scopes);
    return res;
  };

  return {
    tokensGet,
    tokenGet,
    tokenDelete,
    tokenCheck,
    tokenScopesCheck,
  };
};
