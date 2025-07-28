import { useState } from "react";

export default function useField(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNumericChange = (event) => {
    setValue(Number(event.value));
  };

  const resetField = () => {
    setValue(initialValue);
  };

  return { value, handleChange, handleNumericChange, resetField };
}
