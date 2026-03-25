
export const useExports = ({ apiClient }) => {

  // functions
  const exportGet = async (exportUuid) => {
    const res = await apiClient.client.get(`call-logd/1.0/exports/${exportUuid}`);
    return res;
  };

  const exportDownload = async (exportUuid) => {
    const res = await apiClient.client.get(`call-logd/1.0/exports/${exportUuid}/download`);
    return res;
  };

  return {
    exportGet,
    exportDownload,
  };
};
