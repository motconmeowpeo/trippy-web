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

export interface IBaseParams {
  search?: string;
  filter?: any;
  page?: number;
  limit?: number;
}

export interface IStatePagination {
  total: number;
  currentPage: number;
  canPrev: boolean;
  canNext: boolean;
}

export interface IBasePagination<T> extends IStatePagination {
  data: T[];
}
