import { GetFunc, EditFunc } from "./Requests";

// Get data Configs ----------------------------------------------------------
export const GetMeConfig = (query) => {
  return GetFunc(`/college/profile/`);
};

export const GetDirectionsConfig = () => {
  return GetFunc(`/college/direction/`);
};

export const EditDirectionMonth = (id, data) => {
  return EditFunc(`/college/direction/${id}/`, data, "PATCH");
};

export const GetApplicationsConfig = (query) => {
  return GetFunc(`/college/application/${query || ""}`);
};

export const GetAppIDConfig = (id) => {
  return GetFunc(`/college/application/${id}/`);
};

// Edit profile configs
export const EditCollegeConfig = (data) => {
  return EditFunc(`/college/profile/`, data);
};

// Edit Applicant status
export const EditStatusConfig = (id, data) => {
  return EditFunc(`/college/application/${id}/`, data, "PATCH");
};

// Search
export const SearchPINFL = (pinfl) => {
  return GetFunc(`/college/search/${pinfl}`);
};

// EDit edu type in search
export const SearchEditType = (pinfl, edu_type) => {
  return EditFunc(`/college/search/${pinfl}`, { edu_type }, "PATCH");
};

// Minstry stats
export const MinstryStat = (query) => {
  return GetFunc(`/ministry/ac-stats/${query || ""}`);
};

// excel url
export const GetExcelConfig = () => {
  return GetFunc(`/college/excel/`);
};
