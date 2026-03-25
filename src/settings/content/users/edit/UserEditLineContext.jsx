import { NativeSelectUi } from "../../../ui";

const UserEditLineContext = ({ line, setUser, index, internalsContext, context, setContext }) => {
  // requirements

  const change = (e) => {
    const selectedContext = internalsContext.find((item) => item.name === e.target.value);

    if (selectedContext) {
      setContext({
        name: selectedContext.name,
        value: selectedContext.name,
        label: selectedContext.label,
      });
      setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) =>
          idx === index
            ? {
                ...line,
                context: selectedContext.name,
                new_extensions: {
                  exten: line.extensions[0]?.exten || null, // conserver toutes les autres propriétés de extensions[0]
                  context: selectedContext.name, // mise à jour de la propriété context
                },
              }
            : line
        ),
      }));
    }
  };

  return (
    <NativeSelectUi value={context?.name || ""} onChange={change}>
      {internalsContext &&
        internalsContext.map((item, index) => (
          <option value={item.name} key={index}>
            {item.label}
          </option>
        ))}
    </NativeSelectUi>
  );
};

export default UserEditLineContext;
