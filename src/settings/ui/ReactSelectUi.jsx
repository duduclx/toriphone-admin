import Select from "react-select";
import useAsyncSelectStyles from "../../styles/AsyncSelectStyles";

const ReactSelectUi = ({...props}) => {
    const asyncSelectStyles = useAsyncSelectStyles();

  return (
    <Select 
    styles={asyncSelectStyles}
    menuPortalTarget={document.body}
    {...props}
    />
  )
}

export default ReactSelectUi
