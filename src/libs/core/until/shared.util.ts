import { getCountry } from 'countries-and-timezones';
import { IWindowMetric } from '../model/base.model';
export const getWindowMetric = (): IWindowMetric => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return { height, width };
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
