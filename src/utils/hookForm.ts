import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

export function registerManualSetValue<TFormType extends FieldValues>(
  setValue: UseFormSetValue<TFormType>
) {
  return <TField extends FieldPath<TFormType>>(field: TField) => {
    return <TValue extends PathValue<TFormType, TField>>(value: TValue) => {
      setValue(field, value, { shouldValidate: true });
    };
  };
}

export function registerManualSetError<TFormType extends FieldValues>(
  setError: UseFormSetError<TFormType>
) {
  return <TField extends FieldPath<TFormType>>(field: TField) => {
    return (e: unknown) => {
      const { message } = e as Error;
      setError(field, { message });
    };
  };
}

export function validateFormExceptValues(errors: string[], values: string[]) {
  return !errors.filter((err) => !values.includes(err)).length;
}
