import { IWindowMetric, IErrorValidation } from '../model/base.model';
import { ValidationErrors } from '@angular/forms';
import { isArray } from 'lodash';
export const getWindowMetric = (): IWindowMetric => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return { height, width };
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getError = (
  errors: ValidationErrors | null
): IErrorValidation | null => {
  if (errors?.['required']) {
    return {
      key: 'validation.required',
    };
  }

  if (errors?.['email'] || errors?.['pattern'] || errors?.['strongPassword']) {
    return {
      key: 'validation.invalid',
    };
  }

  if (errors?.['minlength']) {
    const error = errors?.['minlength'];
    return {
      key: 'validation.minLength',
      data: {
        minLength: error['requiredLength'],
      },
    };
  }

  //Min Number
  if (errors?.['min']) {
    const error = errors?.['min'];
    return {
      key: 'validation.min',
      data: {
        min: error['min'],
      },
    };
  }

  //Max Number
  if (errors?.['max']) {
    const error = errors?.['max'];
    return {
      key: 'validation.max',
      data: {
        max: error['max'],
      },
    };
  }

  return null;
};

export const toFormData = <T extends { [key: string]: any }>(
  formValue: T,
  fileFieldName?: keyof T,
  fileFieldName2?: keyof T
) => {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key as keyof T];

    if (key === fileFieldName || key === fileFieldName2) {
      isArray(value)
        ? value?.forEach((file: File) => formData.append(key, file))
        : formData.append(key, value as Blob);
      continue;
    }

    isArray(value)
      ? formData.set(key, JSON.stringify(value))
      : formData.set(key, value as string);
  }
  return formData;
};
