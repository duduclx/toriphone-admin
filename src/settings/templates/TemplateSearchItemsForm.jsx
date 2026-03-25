import { useState } from "react";
import { IconButton, InputGroup } from "@chakra-ui/react";
import { InputUi } from "../ui";
import { FaListOl } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import { useApis } from "../../ApiProvider";

const TemplateSearchItemsForm = () => {
  // api
  const { itemsPerPage, setItemsPerPage } = useApis();

  // value
  const [items, setItems] = useState(itemsPerPage);

  const submit = () => {
    const parsedItems = parseInt(items, 10);
    if (!isNaN(parsedItems) && parsedItems > 0) {
      setItemsPerPage(parsedItems);
    } else {
      setItems(itemsPerPage.toString()); // Remet l'ancienne valeur en cas d'erreur
    }
  };

  return (
    <InputGroup
      startElement={<FaListOl />}
      endElement={
        <IconButton variant="ghost" me="-2" onClick={() => submit()}>
          <FaSave />
        </IconButton>
      }
    >
      <InputUi
        min="1"
        type="number"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
    </InputGroup>
  );
};

export default TemplateSearchItemsForm;