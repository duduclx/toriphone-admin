
export const useAdmin = ({ apiClient }) => {

  // functions
  const adminEmailEdit = async (user, emails) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/admin/users/${userUuid}/emails`, emails);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    adminEmailEdit,
  };
};
