import { GetFunc, EditFunc, CreateFunc, DeleteFunc } from "./Requests";

// Login Configs ----------------------------------------------------------
export const SignInOneIDConfig = (code) => {
  return CreateFunc(`/auth/oneIdAuthEduAdmin/signIn?code=${code}`);
};

// Get Directions
export const GetDirectionsConfig = () => {
  return GetFunc(`/eduadmin/join/directions`);
};
export const GetMyDirectionsConfig = (params) => {
  return GetFunc(`/eduadmin/join/getAllDirectionEdu?size=10${params ?? ""}`);
};
export const PostDirectionConfig = (data) => {
  return EditFunc(`/eduadmin/join/joinDirectionEdu`, data, "PATCH");
};
export const DelDirectionConfig = (id) => {
  return DeleteFunc(`/eduadmin/join/deleteJoinDirectionEdu/${id}`);
};

// Get subjects
export const GetSubjectsConfig = () => {
  return GetFunc(`/eduadmin/join/subjects`);
};
export const GetMySubjectsConfig = (params) => {
  return GetFunc(
    `/eduadmin/join/getAllSubjectDirection?size=10${params ?? ""}`
  );
};
export const PostSubjectConfig = (data) => {
  return CreateFunc(`/eduadmin/join/joinSubjectAndDirection`, data);
};
export const DelSubjectConfig = (id) => {
  return DeleteFunc(`/eduadmin/join/deleteJoinDirectionSubject/${id}`);
};

// Get theme
export const GetMyThemesConfig = (params) => {
  return GetFunc(`/eduadmin/allTheme?size=10${params ?? ""}`);
};
export const GetAllResourceConfig = (id) => {
  return GetFunc(`/eduadmin/getAllResource?themeId=${id}`);
};
export const PostThemeConfig = (data) => {
  return CreateFunc(`/eduadmin/createTheme`, data);
};
export const PostFileConfig = (data) => {
  return CreateFunc(`/eduadmin/uploadfile`, data);
};
export const PostResourceConfig = (data) => {
  return CreateFunc(`/eduadmin/createResource`, data);
};
export const DelResourceConfig = (id) => {
  return DeleteFunc(`/eduadmin/deleteResource/${id}`);
};
