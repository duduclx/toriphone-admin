import { AsyncSelectUi } from "../../ui";

const SelectForm = ({ load, change, destination, placeholder }) => {
  // requirements

  return (
      <AsyncSelectUi
        loadOptions={load}
        defaultOptions
        onChange={change}
        value={destination || ""}
        placeholder={placeholder}
      />
  );
};

export default SelectForm;
