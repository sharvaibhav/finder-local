export interface Option {
  id: string;
  name: string;
  value: string;
}
export interface FormField {
  label: string;
  type: string;
  options?: Option[];
  rangeMin?: number;
  rangeMax?: number;
  selection?: Option[];
  min?: number;
  max?: number;
  value?: number;
}

export type FormFields = FormField[];
