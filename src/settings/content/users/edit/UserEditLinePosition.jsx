import { NumberInputUi } from "../../../ui";

const UserEditLinePosition = ({ line, setUser, index }) => {
  const change = (e) => {
    setUser((prev) => ({
        ...prev,
        lines: prev.lines.map((line, idx) => (idx === index ? { ...line, position: e.value === "" ? null : e.value } : line)),
      }));
  };

  return (
    <NumberInputUi
      value={line.position === null ? "" : line.position}
      allowMouseWheel
      min={1}
      max={5}
      onValueChange={change}
      width="100px"
    />
  );
};

export default UserEditLinePosition;
