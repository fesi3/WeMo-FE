import { Dispatch, SetStateAction, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { RegisterFormType } from '../ui/registerForm';
import useRegisterFormValidation, {
  RegisterErrorType,
} from './register.validation';

interface useLoginHandleChangeProps {
  setRegisterFormValue: Dispatch<SetStateAction<RegisterFormType>>;
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
}

function useRegisterHandleChange({
  setRegisterFormValue,
  setErrors,
}: useLoginHandleChangeProps) {
  const { validateRegisterField } = useRegisterFormValidation();
  // 디바운스된 유효성 검사 함수
  const debouncedValidate = useCallback(
    debounce((name: string, currentValues) => {
      const error = validateRegisterField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;

    setRegisterFormValue((prev) => {
      const newValues = { ...prev, [name]: value };

      debouncedValidate(name, newValues);
      return newValues;
    });
  };

  return { handleChange };
}

export default useRegisterHandleChange;
