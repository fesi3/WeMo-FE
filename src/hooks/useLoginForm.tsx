import { useState } from 'react';

function useLoginForm() {
  const [loginFormValue, setLoginFormValue] = useState({
    id: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    setLoginFormValue((prev) => ({ ...prev, [name]: value }));
  };
  return { loginFormValue, handleChange };
}

export default useLoginForm;
