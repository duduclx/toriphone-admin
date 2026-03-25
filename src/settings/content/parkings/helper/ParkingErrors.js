const ParkingLotsErrorsHandler = (e, setErrors, t) => {

  /* sample errors
    Input Error - slots_start: ['Invalid input.']
    Input Error - slots_end: ['Invalid input.']
    Input Error - _schema: ['It is not a valid range']"
  */

  if (e.status === 400) {
    const formattedErrors = {};

    e.error.forEach((err) => {
      const fieldName = err.split(":")[0].split(" - ")[1].trim();
      let title = t("parkingLots.errors.input");
      let message = "";

      switch (fieldName) {
        case "name":
          message = t("parkingLots.errors.requiredName");
          break;
        case "slots_start":
          message = t("parkingLots.errors.requiredStartSlot");
          break;
        case "slots_end":
          message = t("parkingLots.errors.requiredEndSlot");
          break;
        case "_schema":
          message = t("parkingLots.errors.invalidRange");
          break;
        default:
          message = t("parkingLots.errors.unknownField");
      }

      formattedErrors[fieldName] = {description : message};
    });

    setErrors(formattedErrors)
  } 
};

export default ParkingLotsErrorsHandler;
