import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ParkingForm from "../forms/ParkingForm";

const ParkingEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { contexts, contextRangeGet, mohs, parkingLotSelected, parkingLotUpdate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState({});

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [parking, setParking] = useState(parkingLotSelected);

  // extensions
  const [availableExtensions, setAvailableExtensions] = useState([]);

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: parkingLotSelected.extensions[0]?.context,
    exten: parkingLotSelected.extensions[0]?.exten,
    id: parkingLotSelected.extensions[0]?.id,
  });

  // moh form
  let updatedMoh = null;
  if (parkingLotSelected.music_on_hold) {
    updatedMoh = {
      label: mohs.items.find((moh) => moh.name === parkingLotSelected.music_on_hold)?.label || null,
      value: parkingLotSelected.music_on_hold,
    };
  }
  const [moh, setMoh] = useState(updatedMoh);

  // obtenir une lite d'extensions attribuables
  useEffect(() => {
    const fetchContextRange = async () => {
      const range = await contextRangeGet(initialContext.id);

      if (range.items) {
        const available = [];
        range.items.forEach((item) => {
          const start = parseInt(item.start);
          const end = parseInt(item.end);

          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              available.push(i);
            }
          }
        });
        setAvailableExtensions(available);
      }
    };

    fetchContextRange();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setError({});
    setLoading(true);
    const validationErrors = {};
    
    if (!parking.name) {
      validationErrors.name = tErrors("requiredName");
      setLoading(false);
      setError(validationErrors);
      return;
    }

    const res = await parkingLotUpdate(parking, line);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("parkings");
    }
  };

  return (
    <TemplatePage
      title={t("parkingLots.edit.title", { name: parkingLotSelected.name })}
      setSelectedComponent={setSelectedComponent}
      route={"parkings"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <ParkingForm
        parking={parking}
        setParking={setParking}
        line={line}
        setLine={setLine}
        moh={moh}
        setMoh={setMoh}
        error={error}
        availableExtensions={availableExtensions}
      />
    </TemplatePage>
  );
};

export default ParkingEdit;
