export interface ISearchData {
  [key: string]: string | number | undefined;
  id: number;
}

export interface Data {
  [key: string]: any;
}

export interface Metadata {
  dataType: string;
  values: any[];
  min?: string | number;
  max?: string | number;
  trueCount?: number;
  falseCount?: number;
}

export interface ParsedValue {
  dataType: string;
  parsedValue: any;
}
