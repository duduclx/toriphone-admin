import { useState } from "react";

const STORAGE_KEY = "tori_admin_preferences";

const usePreferences = () => {
  // Récupération des préférences stockées ou valeurs par défaut
  const [preferences, setPreferences] = useState(() => {
    const storedPreferences = localStorage.getItem(STORAGE_KEY);
    return storedPreferences ? JSON.parse(storedPreferences) : { items_per_page: "10" };
  });

  // Fonction pour mettre à jour une préférence spécifique
  const setPreference = (key, value) => {
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));
      return updatedPreferences;
    });
  };

  // fonction pour retrouver la préférence

  return { preferences, setPreference };
};

export default usePreferences;
