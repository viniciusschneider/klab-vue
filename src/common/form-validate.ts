type FormEntries = number | string | File | boolean;
type FormError = boolean | string;
type FuncFormError = (value: string) => FormError;

export const required = (value: FormEntries): FormError =>
  !!value || 'Campo é obrigatório';

export const minLength =
  (length: number): FuncFormError =>
  (value: string): FormError =>
    (value || '').length >= length || `Tamanho mínimo é ${length}`;

export const maxLength =
  (length: number): FuncFormError =>
  (value: string): FormError =>
    (value || '').length <= length || `Tamanho máximo é ${length}`;

export const email = (value: string): FormError =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  ) || 'Email é inválido';
