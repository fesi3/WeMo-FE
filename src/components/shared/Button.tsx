import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  width?: string | number;
  height?: string | number;
  // onClick, disabled, type은 React.ButtonHTMLAttributes로 받음
}

/**
 * Button 컴포넌트
 * @component
 *
 * @param {string} [text] - 버튼의 텍스트 (옵션)
 * @param {React.ReactNode} [children] - 버튼 안에 들어가는 내용 (옵션, 텍스트 또는 JSX)
 * @param {'small' | 'medium' | 'large'} [size] - 버튼 텍스트 사이즈 (기본값: 'medium')
 * @param {'primary' | 'option' | 'text' | 'outline'} [variant] - 버튼 스타일 (기본값: 'primary')
 * @param {'enabled' | 'hover' | 'pressed' } [state] - 버튼 상태 (기본값: 'enabled')
 * @param {string} [className] - 추가 클래스 이름
 * @param {boolean} [isActive] - 버튼이 활성화된 상태인지 여부
 * @param {boolean} [disabled] - 버튼 비활성화 여부
 * @param {string | number} [width] - 버튼 가로 길이
 * @param {string | number} [height] - 버튼 세로 길이
 *
 * @example
 * <Button text="로그인" size="large" onClick={handleClick} width={240} height={42}/>
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors duration-200 rounded-lg py-2.5 px-3',
  {
    variants: {
      size: {
        small: 'font-normal text-xs', //12px
        medium: 'font-medium text-sm', //14px
        large: 'font-semibold text-base', //16px
      },
      variant: {
        primary:
          'bg-primary-10 text-white hover:bg-primary-40 active:bg-primary-10 disabled:bg-gray-300',
        option:
          'bg-gray-200 text-black hover:bg-primary-10 hover:text-white active:bg-primary-10 disabled:bg-gray-100',
        text: 'bg-transparent hover:text-primary-10 active:text-primary-10 disabled:text-gray-400',
        outline:
          'bg-transparent text-primary-10 hover:bg-primary-10 hover:text-white active:text-primary-10 border border-primary-10',
      },
      state: {
        enabled: '',
        hover: 'hover:bg-primary-40',
        pressed: 'bg-primary-10 text-white', // 눌린 상태
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'primary',
      state: 'enabled',
    },
  },
);

const Button = ({
  text,
  children,
  size,
  variant,
  state,
  className,
  isActive,
  width,
  height,
  disabled,
  ...props
}: ButtonProps) => {
  // 클래스 병합
  const buttonClassName = twMerge(
    buttonVariants({ size, variant, state }),
    isActive && 'bg-primary-10 text-white',
    className,
    disabled && 'opacity-50 cursor-not-allowed bg-primary-10 text-primary-0',
  );

  return (
    <button
      className={buttonClassName}
      style={{ width, height }}
      disabled={disabled} // disabled 처리
      {...props}
    >
      {text || children}
    </button>
  );
};

export default Button;
