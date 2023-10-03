export interface ISearchData {
  [key: string]: string | number | undefined; // Index signature for keys with spaces
  sapParentAvevaExternalId: string;
  source: string;
  flocBarrierElementPrimary: string;
  createdTime: string;
  state: string;
  id: number;
  flocFunctionalLocation: string;
  System: string;
  flocSystemId: number;
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
