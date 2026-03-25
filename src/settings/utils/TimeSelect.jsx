import { Box, Field } from "@chakra-ui/react";
import { InputUi, NativeSelectUi } from "../ui";

const TimeSelect = ({ label, value, onChange }) => {

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    // Validate input format if necessary
    /*
    if (/^\d{2}:\d{2}$/.test(inputValue)) {
      onChange(inputValue);
    }
    */
  };

  return (
    <Field.Root>
      <Box display="flex" alignItems="center">
        <Field.Label width="150px">{label}</Field.Label>
        <NativeSelectUi value={value} onChange={(e) => onChange(e.target.value)}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </NativeSelectUi>
        <InputUi placeholder="HH:MM" value={value} onChange={handleInputChange} maxW="100px" ml={2} />
      </Box>
    </Field.Root>
  );
};

export default TimeSelect;
