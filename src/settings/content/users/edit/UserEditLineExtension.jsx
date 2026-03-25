import { NativeSelectUi } from "../../../ui";

const UserEditLineExtension = ({ line, setUser, index, availableExtensions, context }) => {
  // requirements

  const change = (e) => {
    setUser((prev) => ({
      ...prev,
      lines: prev.lines.map((line, idx) =>
        idx === index
          ? {
              ...line,
              new_extensions: {
                context: line.new_extensions?.context || line.context,
                exten: e.target.value,
              },
            }
          : line
      ),
    }));
  };

  return (
    <NativeSelectUi value={line.new_extensions?.exten || line.extensions[0]?.exten || null} onChange={change}>
      <option value={line.extensions[0]?.exten}>{line.extensions[0]?.exten || null}</option>
      {availableExtensions.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default UserEditLineExtension;
