import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useIncalls = ({ apiClient }) => {
  
  // dependencies
  const { extensionCreate, extensionDelete } = useExtensions({ apiClient });

  // values
  const [incalls, setIncalls] = useState({});
  const [incallSelected, setIncallSelected] = useState({});

  // functions
  const incallsGet = async () => {
    const incalls = await apiClient.client.get("confd/1.1/incalls?recurse=false");
    setIncalls(incalls);
    return incalls;
  };

  const incallsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const incalls = await apiClient.client.get(`confd/1.1/incalls?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setIncalls(incalls);
      return incalls;
    } else {
      const incalls = await apiClient.client.get(`confd/1.1/incalls?recurse=false&limit=${limit}&offset=${offset}`);
      setIncalls(incalls);
      return incalls;
    }
  }

  const incallGet = async (incallId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/incalls/${incallId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const incallAdd = async (incall) => {
    try {
      const res = await apiClient.client.post("confd/1.1/incalls", incall);
      return res;
    } catch (e) {
      return e;
    }
  };

  const incallCreate = async (incall, line) => {
    const createdIncall = await incallAdd(incall);
    if(createdIncall.error) {
      return createdIncall
    }

    const createdLine = await extensionCreate(line);
    if (createdLine.error) {
      await incallDelete(createdIncall)
      return createdLine
    }
    const created = await incallExtensionAssociate(createdIncall, createdLine)
    if(created.error) {
      await incallDelete(createdIncall)
      await extensionDelete(createdLine)
      return created
    }
    if(incall.schedules) {
        await incallScheduleAssociate(createdIncall, incall.schedules)
    }
    return created;
  };

  const incallEdit = async (incall) => {
    const incallId = incall.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/incalls/${incallId}`, incall);
      return res
    } catch (e) {
      return e
    }
  };

  const incallUpdate = async (incall, line, incallSelected) => {
    const res = await incallEdit(incall);
    if (res.error) {
      return res
    }

    // extension
    if (line.exten !== incall.extensions[0].exten) {
        // dissocier l'existante
        const diss = await incallExtensionDissociate(incall);
        if (diss.error) {
          return diss
        }
        // supprimer l'ancienne extension
        const remove = await extensionDelete(incall.extensions[0]);
        if (remove.error) {
          return remove
        }
        // créer la ligne et l'associer
        const createdLine = await extensionCreate(line);
        if (createdLine.error) {
          return createdLine
        }
        const groupWithLine = await incallExtensionAssociate(incall, createdLine);
        if (groupWithLine.error) {
          return groupWithLine
        }
      }
    // schedule
    if (incall.schedules && incallSelected.schedules[0]) {
        if (incall.schedules.id !== incallSelected.schedules[0].id) {
          const diss = await incallScheduleDissociate(incall, incallSelected.schedules[0]);
          if (diss.error) {
            return diss
          }
          const asso = await incallScheduleAssociate(incall, incall.schedules);
          if (asso.error) {
            return asso
          }
        }
      } else if (incall.schedules && !incallSelected.schedules[0]) {
        const asso = await incallScheduleAssociate(incall, incall.schedules);
        if (asso.error) {
          return asso
        }
      } else if (!incall.schedules && incallSelected.schedules[0]) {
        const diss = await incallScheduleDissociate(incall, incallSelected.schedules[0]);
        if (diss.error) {
          return diss
        }
      }

    return res;
  };

  const incallDelete = async (incall) => {
    const incallId = incall.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/incalls/${incallId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const incallRemove = async (incall) => {
    const deleted = await incallDelete(incall);
    await extensionDelete(incall.extensions[0]);
    return deleted;
  };

  const incallExtensionAssociate = async (incall, extension) => {
    const incallId = incall.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/incalls/${incallId}/extensions/${extensionId}`);
      return res
    } catch (e) {
      return e
    }
  };

  const incallExtensionDissociate = async (incall) => {
    const incallId = incall.id;
    const extensionId = incall.extensions[0].id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/incalls/${incallId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const incallScheduleAssociate = async (incall, schedule) => {
    const incallId = incall.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/incalls/${incallId}/schedules/${scheduleId}`);
      return res
    } catch (e) {
      return e
    }
  };

  const incallScheduleDissociate = async (incall, schedule) => {
    const incallId = incall.id;
    const scheduleId = schedule.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/incalls/${incallId}/schedules/${scheduleId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    incalls,
    setIncalls,
    incallSelected,
    setIncallSelected,
    incallsGet,
    incallsPageGet,
    incallGet,
    incallAdd,
    incallCreate,
    incallEdit,
    incallUpdate,
    incallDelete,
    incallRemove,
    incallExtensionAssociate,
    incallExtensionDissociate,
    incallScheduleAssociate,
    incallScheduleDissociate,
  };
};
