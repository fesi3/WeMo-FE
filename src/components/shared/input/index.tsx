import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  const { type = 'input', placeholder = '입력해 주세요.' } = props;
  return (
    <input
      className="flex-gr h-mobileInputHeight shrink-0 rounded-xl bg-gray-50 p-3 pt-2 placeholder-gray-500 md:h-tabletInputHeight"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
