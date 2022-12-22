export interface IDirections {
  key: string;
  name: string;
  subject_number: number;
}

export interface IList {
  label: string;
  value: string;
}

export interface ISubject {
  key: string;
  name: string;
  status: boolean;
  theme_number: number;
  resurs_number: number;
}

export interface ITheme {
  themeId: number;
  themeName: string;
}
