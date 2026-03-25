import { NumberInput } from "@chakra-ui/react";

const NumberInputUi = ({ ...props }) => {
  return (
    <NumberInput.Root bg="selectBg" borderColor="selectBg" {...props}>
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
      <NumberInput.Scrubber />
      <NumberInput.Input />
    </NumberInput.Root>
  );
};

export default NumberInputUi;
