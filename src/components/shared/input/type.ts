type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'date';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  id: string;
  ariaLabel?: string;
}

export interface WithLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  name: string;
  labelClassName?: string;
}
