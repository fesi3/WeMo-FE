import { Dispatch, SetStateAction, useCallback } from 'react';
import { debounce } from 'lodash';

import { LoginFormTypes } from './type';
import useLoginValidation, { loginErrorType } from './login.validation';

interface useLoginHandleChangeProps {
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  setLoginFormValue: Dispatch<SetStateAction<LoginFormTypes>>;
}

function useLoginHandleChange({
  setErrors,
  setLoginFormValue,
}: useLoginHandleChangeProps) {
  const { validateField } = useLoginValidation();

  // 디바운스된 유효성 검사 함수
  const debouncedValidate = useCallback(
    debounce((name: string, currentValues: LoginFormTypes) => {
      const error = validateField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    setLoginFormValue((prev) => {
      const newValues = { ...prev, [name]: value };
      debouncedValidate(name, newValues);
      return newValues;
    });
  };

  return { handleChange };
}

export default useLoginHandleChange;
