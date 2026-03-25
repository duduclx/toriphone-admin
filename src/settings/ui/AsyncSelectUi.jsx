import AsyncSelect from "react-select/async";
import useAsyncSelectStyles from "../../styles/AsyncSelectStyles";

const AsyncSelectUi = ({ ...props }) => {
    // requirements
    const asyncSelectStyles = useAsyncSelectStyles();

  return (
    <AsyncSelect
        styles={asyncSelectStyles}
        menuPortalTarget={document.body}
        {...props}
      />
  )
}

export default AsyncSelectUi
