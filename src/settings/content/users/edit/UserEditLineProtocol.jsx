import { NativeSelectUi } from "../../../ui";
import useProtocolOptions from "../../../helpers/ProtocolOptions";

const UserEditLineProtocol = ({ line, setUser, index }) => {
  // requirements
  const { protocolOptions } = useProtocolOptions();

  return (
    <NativeSelectUi
      value={line.protocol}
      onChange={(e) =>
        setUser((prev) => ({
          ...prev,
          lines: prev.lines.map((line, idx) => (idx === index ? { ...line, protocol: e.target.value } : line)),
        }))
      }
    >
      {protocolOptions.map((item, index) => (
        <option value={item.value} key={index}>
          {item.label}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default UserEditLineProtocol;
