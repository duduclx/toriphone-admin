import { useEffect } from "react";

const useFilteredItems = ({ filter, setFiltered, items }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!items) return;

      const lowerCaseFilter = filter.toLowerCase();
      const filteredItems = items.filter((item) =>
        Object.values(item).some(
          (value) =>
            value != null && // Exclure null et undefined
            typeof value !== "object" && // Exclure les objets
            value.toString().toLowerCase().includes(lowerCaseFilter)
        )
      );

      setFiltered(filteredItems || []);
    }, 300); // Débounce à 300ms

    return () => clearTimeout(timeoutId); // Nettoyer en cas de nouvelle saisie
  }, [filter, items]);
};

export default useFilteredItems;
