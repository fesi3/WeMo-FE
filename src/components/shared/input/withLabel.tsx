interface WithLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  name: string;
  labelClassName?: string;
}

function withLabel<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithLabelProps & T) => {
    const { id, name, labelClassName = '', ...rest } = props;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className={`text-sm ${labelClassName}`}>
          {name}
        </label>
        <WrappedComponent id={id} {...(rest as T)} />
      </div>
    );
  };
}

export default withLabel;
