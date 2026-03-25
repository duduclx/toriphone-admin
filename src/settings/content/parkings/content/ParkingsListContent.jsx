import { useState } from "react";
import { Table, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ParkingsListContent = ({ parking, setSelectedComponent, page, setPage, search }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { open, onOpen, onClose } = useDisclosure();

  // load
  const [loading, setLoading] = useState(false);

  // api
  const { parkingLots, parkingLotsPageGet, itemsPerPage, setParkingLotSelected, parkingLotRemove } = useApis();

  // submit
  const handleDelete = async () => {
    setLoading(true);
    await parkingLotRemove(parking);
    /*
    const updatedItems = parkingLots.items.filter((item) => item.id !== parking.id);
    setParkingLots((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedItems.length,
    }));
    */
    const newTotal = parkingLots.total - 1;
    const maxPage = Math.max(0, Math.ceil(newTotal / parseInt(itemsPerPage, 10)) - 1);

    // Vérifier si la page actuelle est toujours valide
    if (page > maxPage) {
      setPage(maxPage); // Mettre à jour la page
    } else {
      const offset = page * parseInt(itemsPerPage, 10);
      await parkingLotsPageGet(search, offset, parseInt(itemsPerPage, 10));
    }
    setLoading(false);
    onClose();
  };

  const onEdit = () => {
    setParkingLotSelected(parking);
    setSelectedComponent("parkingEdit");
  };

  return (
    <TemplateListContent
      onEdit={onEdit}
      onOpen={onOpen}
      open={open}
      onClose={onClose}
      title={t("parkingLots.delete.title")}
      ressource={parking}
      subTitle={t("parkingLots.delete.subTitle", { name: parking.name })}
      submit={handleDelete}
      loading={loading}
    >
      <Table.Cell>{parking.name}</Table.Cell>
      <Table.Cell>{parking.extensions[0]?.exten}</Table.Cell>
      <Table.Cell>{parking.slots_start}</Table.Cell>
      <Table.Cell>{parking.slots_end}</Table.Cell>
    </TemplateListContent>
  );
};

export default ParkingsListContent;
