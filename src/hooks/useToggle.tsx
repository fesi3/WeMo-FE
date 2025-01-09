import { useState } from 'react';

export default function useToggle() {
  const [toggleValue, setToggleValue] = useState(false);
  const handleOpen = () => setToggleValue(true);
  const handleClose = () => setToggleValue(false);

  return { toggleValue, handleOpen, handleClose };
}
