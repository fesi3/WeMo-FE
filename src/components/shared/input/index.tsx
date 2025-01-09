import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
}

function Input(props: InputProps) {
  const { type = 'input', placeholder = '입력해 주세요.' } = props;
  return (
    <input
      className="h-mobileInputHeight p-4 pt-2 md:h-tabletInputHeight"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
