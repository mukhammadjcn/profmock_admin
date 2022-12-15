export interface IApplication {
  key: number;
  name: string;
  edu_type: string;
  edu_dir: string;
  cost: number;
}

export interface IDirection {
  id: number;
  key: number;
  code: string;
  name: string;
  course: string;
  full_time_cost: number;
  full_time_month: number;
  full_time_SPM: number;
  full_time_SPY: number;
  full_time_end_date: string;
  dual_cost: number;
  dual_month: number;
  dual_SPM: number;
  dual_SPY: number;
  dual_end_date: string;
  extramural_cost: number;
  extramural_month: number;
  extramural_SPM: number;
  extramural_SPY: number;
  extramural_end_date: string;
  evening_cost: number;
  evening_month: number;
  evening_SPM: number;
  evening_SPY: number;
  evening_end_date: string;
  direction_type: "prof" | "dtm";
}

export interface ISettings {
  inn: string;
  region: number;
  district: number;
  address: string;
  rector: string;
  qqs: string;
  postal_code: string;
  shghv: string;
  shghv_name: string;
  bank_name: string;
}

export interface IRegion {
  id: number;
  name: string;
  districts: IDistrict[];
}

export interface IDistrict {
  id: number;
  name: string;
}
