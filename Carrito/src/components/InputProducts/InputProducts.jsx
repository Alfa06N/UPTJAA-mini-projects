import { NumberInput } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function InputProducts({
  defaultValue,
  min,
  max,
  value,
  onChange,
  ...props
}) {
  return (
    <NumberInput.Root
      allowMouseWheel
      defaultValue={defaultValue}
      min={min}
      max={max}
      value={value}
      onValueChange={(event) => {
        onChange(event);
      }}
      width={"max(200px, 50%)"}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  );
}

InputProducts.propTypes = {
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  props: PropTypes.object,
};
