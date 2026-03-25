import { useState } from "react";

export const useTimezones = ({ apiClient }) => {
    
  // values
  const [timezones, setTimezones] = useState({});

  // functions
  const timezonesGet = async () => {
    const timezonesList = await apiClient.client.get("confd/1.1/timezones");
    setTimezones(timezonesList);
    return timezonesList;
  };

  return { timezones, timezonesGet };
};
