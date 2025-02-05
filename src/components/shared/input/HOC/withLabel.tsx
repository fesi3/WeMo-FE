import { twMerge } from 'tailwind-merge';

export interface WithLabelProps {
  id: string;
  labelName: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
}

// HOC 패턴을 활용한 withLabel 컴포넌트
// 라벨을 적용할 컴포넌트를 매개변수로 전달해주세요.
// 라벨을 사용한다면 aria-label을 따로 작성하지 않아도 됩니다. (htmlFor, id 덕분에)
// props.id: 컴포넌트와 label의 htmlFor 값을 지정합니다.
// props.name: label의 이름을 지정합니다.
// props.labelClassName: label의 className

function withLabel<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithLabelProps & T) => {
    const {
      id,
      labelName,
      onChange,
      inputValue,
      labelClassName = '',
      ...rest
    } = props;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className={twMerge('text-sm', labelClassName)}>
          {labelName}
        </label>
        <WrappedComponent
          onChange={onChange}
          name={labelName}
          value={inputValue}
          id={id}
          {...(rest as T)}
        />
      </div>
    );
  };
}

export default withLabel;
