import { useState, useEffect } from "react";
import { Box, Table, Button, IconButton } from "@chakra-ui/react";
import { CheckboxUi, NativeSelectUi } from "../../../ui";
import { toaster } from "../../../../components/ui/toaster";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";

const ProfileEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sources, sourcesGet, profileSelected, profileEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [currentProfile, setCurrentProfile] = useState([]);
  const [availableSources, setAvailableSources] = useState([]);

  useEffect(() => {
    sourcesGet();
  }, []);

  useEffect(() => {
    // Mettre à jour availableSources lorsque sources change
    if (sources && sources.items) {
      const allSources = currentProfile.map((source) => source.uuid);
      setAvailableSources(sources.items.filter((source) => !allSources.includes(source.uuid)));
    }
  }, [sources]);

  useEffect(() => {
    const initializeProfile = () => {
      const uniqueSources = Array.from(
        new Set([
          ...profileSelected.services.favorites.sources.map((source) => source.uuid),
          ...profileSelected.services.reverse.sources.map((source) => source.uuid),
          ...profileSelected.services.lookup.sources.map((source) => source.uuid),
        ])
      );

      const tempProfile = uniqueSources.map((uuid) => {
        const sourceName = getSourceName(uuid);
        return {
          uuid,
          name: sourceName,
          favorites: profileSelected.services.favorites.sources.some((source) => source.uuid === uuid),
          reverse: profileSelected.services.reverse.sources.some((source) => source.uuid === uuid),
          lookup: profileSelected.services.lookup.sources.some((source) => source.uuid === uuid),
        };
      });

      setCurrentProfile(tempProfile);
    };

    initializeProfile();
  }, [sources]);

  const getSourceName = (uuid) => {
    const source = sources?.items?.find((item) => item.uuid === uuid);
    return source ? source.name : uuid;
  };

  const handleCheckboxChange = (service, uuid, checked) => {
    setCurrentProfile((prevProfile) =>
      prevProfile.map((item) => (item.uuid === uuid ? { ...item, [service]: checked } : item))
    );
  };

  const handleSourceChange = (oldUuid, newUuid) => {
    setCurrentProfile((prevProfile) =>
      prevProfile.map((item) =>
        item.uuid === oldUuid ? { ...item, uuid: newUuid, name: getSourceName(newUuid) } : item
      )
    );
  };

  const addNewSource = () => {
    const newUuid = availableSources.length > 0 ? availableSources[0].uuid : null;

    if (!newUuid) {
      toaster.create({
        type: "error",
        title: t("profiles.error"),
        description: t("profiles.error_message"),
        duration: 3000,
        closable: true,
      });
      return;
    }

    if (newUuid) {
      const newSourceName = getSourceName(newUuid);

      setCurrentProfile((prevProfile) => [
        ...prevProfile,
        {
          uuid: newUuid,
          name: newSourceName,
          favorites: false,
          reverse: false,
          lookup: false,
        },
      ]);

      setAvailableSources((prevAvailableSources) => prevAvailableSources.filter((source) => source.uuid !== newUuid));
    }
  };

  const deleteSource = (uuid) => {
    setCurrentProfile((prevProfile) => {
      const updatedProfile = prevProfile.filter((source) => source.uuid !== uuid);

      const newAvailableSources =
        sources?.items?.filter((source) => !updatedProfile.map((s) => s.uuid).includes(source.uuid)) || [];
      setAvailableSources(newAvailableSources);

      return updatedProfile;
    });
  };

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const updatedProfile = {
      ...profileSelected,
      services: {
        favorites: {
          sources: currentProfile.filter((item) => item.favorites).map((item) => ({ uuid: item.uuid })),
          options: {},
        },
        reverse: {
          sources: currentProfile.filter((item) => item.reverse).map((item) => ({ uuid: item.uuid })),
          options: {},
        },
        lookup: {
          sources: currentProfile.filter((item) => item.lookup).map((item) => ({ uuid: item.uuid })),
          options: {},
        },
      },
    };
    const res = await profileEdit(updatedProfile);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("profiles");
    }
  };

  return (
    <TemplatePage
      title={t("profiles.edit.title", {
        name: profileSelected.name,
      })}
      setSelectedComponent={setSelectedComponent}
      route={"profiles"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row bg="TableHeaderBg">
            <Table.ColumnHeader>{t("profiles.source")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("profiles.favorites")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("profiles.reverse")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("profiles.lookup")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("profiles.remove")}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentProfile.map((item) => (
            <Table.Row bg="TableBodyBg" key={item.uuid}>
              <Table.Cell>
                <NativeSelectUi value={item.name} onChange={(e) => handleSourceChange(item.uuid, e.target.value)}>
                  <option value={item.uuid}>{item.name}</option>
                  {availableSources.map((source) => (
                    <option key={source.uuid} value={source.uuid}>
                      {source.name}
                    </option>
                  ))}
                </NativeSelectUi>
              </Table.Cell>
              <Table.Cell>
                <CheckboxUi
                  checked={item.favorites}
                  onCheckedChange={(e) => handleCheckboxChange("favorites", item.uuid, e.checked)}
                ></CheckboxUi>
              </Table.Cell>
              <Table.Cell>
                <CheckboxUi
                  checked={item.reverse}
                  onCheckedChange={(e) => handleCheckboxChange("reverse", item.uuid, e.checked)}
                ></CheckboxUi>
              </Table.Cell>
              <Table.Cell>
                <CheckboxUi
                  checked={item.lookup}
                  onCheckedChange={(e) => handleCheckboxChange("lookup", item.uuid, e.checked)}
                ></CheckboxUi>
              </Table.Cell>
              <Table.Cell>
                <IconButton variant="ghost" colorPalette="danger" onClick={() => deleteSource(item.uuid)}>
                  <FaTrashAlt />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box textAlign="center">
        <Button colorPalette="primary" onClick={addNewSource} mt="4">
          <FaPlus /> {t("profiles.source_add")}
        </Button>
      </Box>
    </TemplatePage>
  );
};

export default ProfileEdit;
