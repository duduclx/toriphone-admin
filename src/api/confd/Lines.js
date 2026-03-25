import { useState } from "react";

export const useLines = ({ apiClient }) => {
  // values
  const [lines, setLines] = useState({});
  const [lineSelected, setLineSelected] = useState({});

  const linesGet = async () => {
    const lines = await apiClient.client.get("confd/1.1/lines?recurse=false");
    setLines(lines);
    return lines;
  };

  const linesPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const lines = await apiClient.client.get(
        `confd/1.1/lines?recurse=false&limit=${limit}&offset=${offset}&search=${search}`
      );
      setLines(lines);
      return lines;
    } else {
      const lines = await apiClient.client.get(`confd/1.1/lines?recurse=false&limit=${limit}&offset=${offset}`);
      setLines(lines);
      return lines;
    }
  };

  const lineGet = async (line) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/lines/${lineId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineAdd = async (line) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/lines`, line);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEdit = async (line) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}`, line);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineDelete = async (line) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineDeleteRecursive = async (line) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}?recurse=true`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const ALPHANUMERIC_POOL = "abcdefghijklmnopqrstuvwxyz0123456789";
  const generateString = (length = 8) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += ALPHANUMERIC_POOL.charAt(Math.floor(Math.random() * ALPHANUMERIC_POOL.length));
    }
    return result;
  };

  const lineCreate = async (line) => {
    const name = generateString();
    const password = generateString();
    const lineOptions = {
      caller_id_name: line.firstname + " " + line.lastname,
      caller_id_num: line.extensions.exten.toString(),
      context: line.extensions.context,
      firstname: line.firstname,
      lastname: line.lastname,
      registrar: "default",
      position: 1,
      extensions: [
        {
          context: line.extensions.context,
          exten: line.extensions.exten.toString(),
        },
      ],
      endpoint_sip: {
        auth_section_options: [
          ["username", name],
          ["password", password],
        ],
        label: name,
        name: name,
        templates: [
          {
            label: line.sipTemplate.label,
            uuid: line.sipTemplate.uuid,
          },
        ],
      },
    };

    try {
      const newLine = await apiClient.client.post("confd/1.1/lines", lineOptions);
      return newLine;
    } catch (e) {
      return e;
    }
  };

  const lineApplicationAssociate = async (line, application) => {
    const lineId = line.id;
    const applicationUuid = application.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/applications/${applicationUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineApplicationDissociate = async (line, application) => {
    const lineId = line.id;
    const applicationUuid = application.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/applications/${applicationUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineDevicesGet = async (line) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.get(`confd/1.1/lines/${lineId}/devices`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineDeviceAssociate = async (line, device) => {
    const lineId = line.id;
    const deviceId = device.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/devices/${deviceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineDeviceDissociate = async (line, device) => {
    const lineId = line.id;
    const deviceId = device.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/devices/${deviceId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsCustomAssociate = async (line, custom) => {
    const lineId = line.id;
    const customId = custom.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/endpoints/custom/${customId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsCustomDissociate = async (line, custom) => {
    const lineId = line.id;
    const customId = custom.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/endpoints/custom/${customId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsSccpAssociate = async (line, sccp) => {
    const lineId = line.id;
    const sccpId = sccp.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/endpoints/sccp/${sccpId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsSccpDissociate = async (line, sccp) => {
    const lineId = line.id;
    const sccpId = sccp.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/endpoints/sccp/${sccpId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsSipAssociate = async (line, sip) => {
    const lineId = line.id;
    const sipUuid = sip.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/endpoints/sip/${sipUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineEndpointsSipDissociate = async (line, sip) => {
    const lineId = line.id;
    const sipUuid = sip.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/endpoints/sip/${sipUuid}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineExtensionsAdd = async (line, extension) => {
    const lineId = line.id;
    try {
      const res = await apiClient.client.post(`confd/1.1/lines/${lineId}/extensions`, extension);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineExtensionsAssociate = async (line, extension) => {
    const lineId = line.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/lines/${lineId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const lineExtensionsDissociate = async (line, extension) => {
    const lineId = line.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/lines/${lineId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    lines,
    setLines,
    lineSelected,
    setLineSelected,
    linesGet,
    linesPageGet,
    lineGet,
    lineAdd,
    lineEdit,
    lineDelete,
    lineDeleteRecursive,
    lineCreate,
    lineApplicationAssociate,
    lineApplicationDissociate,
    lineDevicesGet,
    lineDeviceAssociate,
    lineDeviceDissociate,
    lineEndpointsCustomAssociate,
    lineEndpointsCustomDissociate,
    lineEndpointsSccpAssociate,
    lineEndpointsSccpDissociate,
    lineEndpointsSipAssociate,
    lineEndpointsSipDissociate,
    lineExtensionsAdd,
    lineExtensionsAssociate,
    lineExtensionsDissociate,
  };
};
