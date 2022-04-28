type InputPropType = {
  type?: string;
  placeholder?: string;
  label: string;
  defaultValue: number | string;
  showError?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};
export type { InputPropType };
