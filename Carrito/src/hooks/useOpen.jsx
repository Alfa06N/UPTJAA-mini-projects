import { useState } from "react";

export default function useOpen(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openFunction = () => {
    setIsOpen(true);
  };

  const closeFunction = () => {
    setIsOpen(false);
  };

  return { isOpen, openFunction, closeFunction };
}
