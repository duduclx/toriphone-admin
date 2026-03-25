import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import ParkingForm from "../forms/ParkingForm";

const ParkingCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");
  const { t: tErrors } = useTranslation("errors");

  // api
  const { contexts, contextRangeGet, parkingLotCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState({});

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [parking, setParking] = useState({
    name: "",
    slots_start: "",
    slots_end: "",
    timeout: null
  });

  // extensions
  const [availableExtensions, setAvailableExtensions] = useState([]);

  // line form
  const initialContext = contexts.items.find((item) => item.type === "internal") || {};
  const [line, setLine] = useState({
    context: "",
    exten: "",
  });

  // moh form
  const [moh, setMoh] = useState(null);

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
        setLine({
          context: initialContext.name,
          exten: available[0],
        });
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

    const res = await parkingLotCreate(parking, line);
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
      title={t("parkingLots.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"parkings"}
      submit={submit}
      isCreate
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

export default ParkingCreate;
