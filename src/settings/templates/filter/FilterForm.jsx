import { InputGroup, CloseButton } from "@chakra-ui/react";
import { InputUi } from "../../ui";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

const FilterForm = ({ filter, setFilter }) => {
  // requirements
  const { t } = useTranslation("admin");

  return (
    <InputGroup
      startElement={<FaSearch />}
      endElement={<CloseButton onClick={() => setFilter("")} me="-2" />}
    >
      <InputUi flex="1" placeholder={t("common.filter")} value={filter} onChange={(e) => setFilter(e.target.value)} />
    </InputGroup>
  );
};

export default FilterForm;
