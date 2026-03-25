import { useState } from "react";

export const useSchedules = ({ apiClient }) => {

  // values
  const [schedules, setSchedules] = useState({});
  const [scheduleSelected, setScheduleSelected] = useState({});

  /**
   * Schedules Get
   * @returns 
   */
  const schedulesGet = async () => {
    const schedulesList = await apiClient.client.get("confd/1.1/schedules?recurse=false");
    setSchedules(schedulesList);
    return schedulesList;
  };

  /**
   * Schedules Page Get
   * @param {*} search 
   * @param {*} offset 
   * @param {*} limit 
   * @returns 
   */
  const schedulePageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const schedulesList = await apiClient.client.get(`confd/1.1/schedules?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setSchedules(schedulesList);
      return schedulesList;
    } else {
      const schedulesList = await apiClient.client.get(`confd/1.1/schedules?recurse=false&limit=${limit}&offset=${offset}`);
      setSchedules(schedulesList);
      return schedulesList;
    }
  }

  /**
   * Schedule Add
   * @param {*} schedule 
   * @returns 
   */
  const scheduleAdd = async (schedule) => {
    try {
      const res = await apiClient.client.post("confd/1.1/schedules", schedule);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Schedule Edit
   * @param {*} schedule 
   * @returns 
   */
  const scheduleEdit = async (schedule) => {
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/schedules/${scheduleId}`, schedule);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * Schedule Delete
   * @param {*} schedule 
   * @returns 
   */
  const scheduleDelete = async (schedule) => {
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    schedules,
    setSchedules,
    scheduleSelected,
    setScheduleSelected,
    schedulesGet,
    schedulePageGet,
    scheduleAdd,
    scheduleEdit,
    scheduleDelete,
  };
};
