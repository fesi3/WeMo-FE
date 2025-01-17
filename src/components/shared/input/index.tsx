import React from 'react';
import { twMerge } from 'tailwind-merge';
import { InputType } from './type';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  id: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// props 추가 작성 가능
// className 추가 작성 가능
// 피드백 환영입니다! 공통 컴포넌트 만드는 거 어렵네요,,,
function Input(props: InputProps) {
  const {
    type = 'text',
    placeholder = '입력해 주세요.',
    className,
    onChange,
    ...rest
  } = props;
  const inputClassName = twMerge(
    `h-mobileInputHeight drop-shadow shrink-0 flex-grow rounded-[4px] bg-gray-50 p-3 text-base focus:outline-none focus:ring focus:ring-primary-90 placeholder-gray-500 md:h-tabletInputHeight`,
    className,
  );
  return (
    <input
      className={inputClassName}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
