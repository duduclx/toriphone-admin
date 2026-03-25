import { useState } from "react";
import usePreferences from "./preferences";

const useItemsPerPage = () => {
  // requirements
  const { preferences, setPreference } = usePreferences();

  // Récupération de la valeur 'items_per_page' stockée ou valeur par défaut
  const [itemsPerPage, setItemsPerPageState] = useState(() => {
    return preferences.items_per_page || 10;
  });

  // Mise à jour des préférences avec 'items_per_page'
  const setItemsPerPage = (value) => {
    setItemsPerPageState(value);
    setPreference("items_per_page", value); // Met à jour la préférence dans localStorage
  };

  return { itemsPerPage, setItemsPerPage };
};

export default useItemsPerPage;
