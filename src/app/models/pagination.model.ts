export class PaginationRequestModel {
  lenght: number;
  current: number;
  search: string;
}

export class PaginationModel<T> extends PaginationRequestModel{
  total: number;
  data: T[];
}
