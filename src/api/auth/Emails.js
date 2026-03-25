
export const useEmails = ({ apiClient }) => {

  // functions
  const emailConfirmGet = async (email, token) => {
    const emailUuid = email.uuid;
    const confirm = await apiClient.client.get(`auth/0.1/emails/${emailUuid}/confirm?token=${token}`);
    return confirm;
  };

  const emailConfirm = async (email) => {
    const emailUuid = email.uuid;
    try {
      await apiClient.client.put(`auth/0.1/emails/${emailUuid}/confirm`);
    } catch (e) {
      //return false
    }
    return true;
  };

  return {
    emailConfirmGet,
    emailConfirm,
  };
};
