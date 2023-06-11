import { ModalCloseStatus } from '@core/enum';
export interface ISelectItem {
  name: string;
  value: string | number | boolean | any;
  disabled?: boolean;
  data?: any;
}
export interface IWindowMetric {
  height: number;
  width: number;
}

export interface IBaseModalData {
  title?: string;
}

export interface IBaseModalResult {
  status?: ModalCloseStatus;
  data?: any;
}
export interface IErrorValidation {
  key: string;
  data?: any;
}
