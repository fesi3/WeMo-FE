import React from 'react';
import { InputType } from './type';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  id: string;
  ariaLabel?: string;
}

// props 추가 작성 가능
// className 추가 작성 가능
// 피드백 환영입니다! 공통 컴포넌트 만드는 거 어렵네요,,,
function Input(props: InputProps) {
  const { type = 'text', placeholder = '입력해 주세요.', ariaLabel } = props;
  return (
    <input
      aria-label={ariaLabel}
      className="h-mobileInputHeight shrink-0 flex-grow rounded-xl bg-gray-50 p-3 pt-2 text-base placeholder-gray-500 md:h-tabletInputHeight"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
