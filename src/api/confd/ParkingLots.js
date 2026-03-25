import { useState } from "react";
import { useExtensions } from "./Extensions";

export const useParkingLots = ({ apiClient }) => {

  // dependencies
  const { extensionCreate, extensionDelete } = useExtensions({ apiClient });

  // values
  const [parkingLots, setParkingLots] = useState({});
  const [parkingLotSelected, setParkingLotSelected] = useState({});

  // functions
  const parkingLotsGet = async () => {
    const parkingLots = await apiClient.client.get("confd/1.1/parkinglots?recurse=false");
    setParkingLots(parkingLots);
    return parkingLots;
  };

  const parkingLotsPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const parkingLots = await apiClient.client.get(`confd/1.1/parkinglots?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setParkingLots(parkingLots);
      return parkingLots;
    } else {
      const parkingLots = await apiClient.client.get(`confd/1.1/parkinglots?recurse=false&limit=${limit}&offset=${offset}`);
      setParkingLots(parkingLots);
      return parkingLots;
    }
  }

  const parkingLotGet = async (parkingLotId) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/parkinglots/${parkingLotId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const parkingLotAdd = async (parkingLot) => {
    try {
      const res = await apiClient.client.post("confd/1.1/parkinglots", parkingLot);
      return res;
    } catch (e) {
      return e;
    }
  };

  const parkingLotCreate = async (parking, line) => {
    const park = await parkingLotAdd(parking);
    if (park.error) {
      return park;
    }
    const exten = await extensionCreate(line);
    if (exten.error) {
      await parkingLotDelete(park);
      return exten;
    }
    const association = await parkingLotAssociateExtension(park, exten);
    if (association.error) {
      return association;
    }
    return park;
  };

  const parkingLotEdit = async (parkingLot) => {
    const parkingLotId = parkingLot.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/parkinglots/${parkingLotId}`, parkingLot);
      return res;
    } catch (e) {
      return e;
    }
  };

  const parkingLotUpdate = async (parking, line) => {
    const res = await parkingLotEdit(parking);
    if (res.error) {
      return res;
    }
    if (!line.id) {
      if (parking.extensions[0]) {
        const diss = await parkingLotDissociateExtension(parking, parking.extensions[0]);
        if (diss.error) {
          return diss;
        }
        const remove = await extensionDelete(parking.extensions[0]);
        if (remove.error) {
          return remove;
        }
      }
      const exten = await extensionCreate(line);
      if (exten.error) {
        return exten;
      }
      const asso = await parkingLotAssociateExtension(parking, exten);
      if (asso.error) {
        return asso;
      }
    }
    return res;
  };

  const parkingLotDelete = async (parkingLot) => {
    const parkingLotId = parkingLot.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/parkinglots/${parkingLotId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const parkingLotRemove = async (parking) => {
    const res = await parkingLotDelete(parking);
    if (res.error) {
      return res;
    }
    //await parkingLotDissociateExtension(parking, parking.extensions[0])
    if (!res.error && parking.extensions[0]) {
      const remove = await extensionDelete(parking.extensions[0]);
      if (remove.error) {
        return remove;
      }
    }
    return res;
  };

  const parkingLotAssociateExtension = async (parkingLot, extension) => {
    const parkingLotId = parkingLot.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.put(`confd/1.1/parkinglots/${parkingLotId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  const parkingLotDissociateExtension = async (parkingLot, extension) => {
    const parkingLotId = parkingLot.id;
    const extensionId = extension.id;
    try {
      const res = await apiClient.client.delete(`confd/1.1/parkinglots/${parkingLotId}/extensions/${extensionId}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    parkingLots,
    setParkingLots,
    parkingLotSelected,
    setParkingLotSelected,
    parkingLotsGet,
    parkingLotsPageGet,
    parkingLotGet,
    parkingLotAdd,
    parkingLotCreate,
    parkingLotEdit,
    parkingLotUpdate,
    parkingLotDelete,
    parkingLotRemove,
    parkingLotAssociateExtension,
    parkingLotDissociateExtension,
  };
};
