const useAsyncSelectStyles = () => {

  return {
    container: (provided) => ({
      ...provided,
      width: "100%",
      height: "100%"
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--chakra-colors-select-bg)",
      borderColor: "var(--chakra-colors-select-border)",
      minHeight: "44px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--chakra-colors-select-hover)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--chakra-colors-select-bg)",
      borderRadius: "4px",
      boxShadow: "var(--chakra-shadows-lg)",
      marginTop: "4px",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--chakra-colors-select-bg)"
        : state.isFocused
        ? "var(--chakra-colors-select-hover)"
        : "var(--chakra-colors-select-bg)",
      color: "var(--chakra-colors-text)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: state.isSelected
          ? "var(--chakra-colors-select-bg)"
          : "var(--chakra-colors-select-hover)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--chakra-colors-text)",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--chakra-colors-select-bg)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--chakra-colors-text)",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--chakra-colors-text)",
      ":hover": {
        backgroundColor: "var(--chakra-colors-cross)",
      },
    }),
  };
};

export default useAsyncSelectStyles;