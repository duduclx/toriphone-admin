import { useState } from "react";

export const usePlugindStatus = ({ apiClient }) => {
  // values
  const [plugindStatus, setPlugindStatus] = useState({
    name: "plugind",
    master_tenant: {
      status: ""
    },
    rest_api: {
      status: ""
    }
  });

  const plugindStatusGet = async () => {
    // ne supporte pas wazo-tenant dans le header, doit passer par un fetch
    /*
    try {
      const res = await apiClient.client.get(`plugind/0.2/status`);
      const withName = { ...res, name: "plugind" };
      setPlugindStatus(withName);
      return withName;
    } catch (e) {
      return e;
    }
      */
    try {
      const response = await fetch(`https://${apiClient.client.server}/api/plugind/0.2/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": apiClient.client.token,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `HTTP error! status: ${response.status}`,
          body: errorBody ? JSON.parse(errorBody) : null,
        };
      }

      const data = await response.json();
      const withName = { ...data, name: "plugind" };
      setPlugindStatus(withName);
      return withName;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          message: "Error parsing JSON from response",
          error,
        };
      }
      return error;
    }
  };

  return { plugindStatus, setPlugindStatus, plugindStatusGet };
};