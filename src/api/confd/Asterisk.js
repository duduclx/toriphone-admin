
export const useAsterisk = ({ apiClient }) => {

  // values

  // functions
  const asteriskConfbridgeWazoGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/confbridge/wazo_default_bridge");
    return res;
  };

  const asteriskConfbridgeWazoEdit = async (wazo_default_bridge) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/confbridge/wazo_default_bridge`, wazo_default_bridge);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskConfbridgeUserGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/confbridge/wazo_default_user");
    return res;
  };

  const asteriskConfbridgeUserEdit = async (wazo_default_user) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/confbridge/wazo_default_user`, wazo_default_user);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskFeaturesApplicationmapGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/features/applicationmap");
    return res;
  };

  const asteriskFeaturesApplicationmapEdit = async (applicationmap) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/features/applicationmap`, applicationmap);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskFeaturesFeaturemapGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/features/featuremap");
    return res;
  };

  const asteriskFeaturesFeaturemapEdit = async (featuremap) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/features/featuremap`, featuremap);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskFeaturesGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/features/general");
    return res;
  };

  const asteriskFeaturesGeneralEdit = async (general) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/features/general`, general);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskHepGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/hep/general");
    return res;
  };

  const asteriskHepGeneralEdit = async (general) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/hep/general`, general);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskIaxCallnumberlimitsGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/iax/callnumberlimits");
    return res;
  };

  const asteriskIaxCallnumberlimitsEdit = async (callnumberlimits) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/iax/callnumberlimits`, callnumberlimits);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskIaxGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/iax/general");
    return res;
  };

  const asteriskIaxGeneralEdit = async (general) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/iax/general`, general);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskPjsipDocGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/pjsip/doc");
    return res;
  };

  const asteriskPjsipGlobalGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/pjsip/global");
    return res;
  };

  const asteriskPjsipGlobalEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/pjsip/global`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskPjsipSystemGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/pjsip/system");
    return res;
  };

  const asteriskPjsipSystemEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/pjsip/system`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskQueuesGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/queues/general");
    return res;
  };

  const asteriskQueuesGeneralEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/queues/general`, options);
    } catch (e) {
      return e;
    }
  };

  const asteriskRtpGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/rtp/general");
    return res;
  };

  const asteriskRtpGeneralEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/rtp/general`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskRtpIcehostcandidatesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/rtp/ice_host_candidates");
    return res;
  };

  const asteriskRtpIcehostcandidatesEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/rtp/ice_host_candidates`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskSccpGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/sccp/general");
    return res;
  };

  const asteriskSccpGeneralEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/sccp/general`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskVoicemailGeneralGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/voicemail/general");
    return res;
  };

  const asteriskVoicemailGeneralEdit = async (options) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/voicemail/general`, options);
      return res;
    } catch (e) {
      return e;
    }
  };

  const asteriskVoicemailZonemessagesGet = async () => {
    const res = await apiClient.client.get("confd/1.1/asterisk/voicemail/zonemessages");
    return res;
  };

  const asteriskVoicemailZonemessagesEdit = async (zonemessages) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/asterisk/voicemail/zonemessages`, zonemessages);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    asteriskConfbridgeWazoGet,
    asteriskConfbridgeWazoEdit,
    asteriskConfbridgeUserGet,
    asteriskConfbridgeUserEdit,
    asteriskFeaturesApplicationmapGet,
    asteriskFeaturesApplicationmapEdit,
    asteriskFeaturesFeaturemapGet,
    asteriskFeaturesFeaturemapEdit,
    asteriskFeaturesGeneralGet,
    asteriskFeaturesGeneralEdit,
    asteriskHepGeneralGet,
    asteriskHepGeneralEdit,
    asteriskIaxCallnumberlimitsGet,
    asteriskIaxCallnumberlimitsEdit,
    asteriskIaxGeneralGet,
    asteriskIaxGeneralEdit,
    asteriskPjsipDocGet,
    asteriskPjsipGlobalGet,
    asteriskPjsipGlobalEdit,
    asteriskPjsipSystemGet,
    asteriskPjsipSystemEdit,
    asteriskQueuesGeneralGet,
    asteriskQueuesGeneralEdit,
    asteriskRtpGeneralGet,
    asteriskRtpGeneralEdit,
    asteriskRtpIcehostcandidatesGet,
    asteriskRtpIcehostcandidatesEdit,
    asteriskSccpGeneralGet,
    asteriskSccpGeneralEdit,
    asteriskVoicemailGeneralGet,
    asteriskVoicemailGeneralEdit,
    asteriskVoicemailZonemessagesGet,
    asteriskVoicemailZonemessagesEdit,
  };
};
