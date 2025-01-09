import { JSX } from 'react';

interface WithLabelProps {
  children: JSX.Element;
  htmlFor: string;
  name: string;
}

function WithLabel(props: WithLabelProps) {
  const { children, htmlFor, name } = props;
  return (
    <>
      <label htmlFor={htmlFor}>{name}</label>
      {children}
    </>
  );
}

export default WithLabel;
