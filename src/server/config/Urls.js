import { GetFunc, EditFunc, CreateFunc, DeleteFunc } from "./Requests";

// Login Configs ----------------------------------------------------------
export const SignInOneIDAdminConfig = (code) => {
  return CreateFunc(`/auth/oneIdAuthEduAdmin/signIn?code=${code}`);
};
export const SignInOneIDUserConfig = (code) => {
  return CreateFunc(`/auth/singInUserOneId?code=${code}`);
};
export const GetUserInfoConfig = () => {
  return GetFunc(`/eduadmin/userInfo`);
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
export const DelThemeConfig = (id) => {
  return DeleteFunc(`/eduadmin/deleteTheme?themeId=${id}`);
};

// Stats
export const GetUniverStatConfig = () => {
  return GetFunc(`/statistic/getResourceCountByEdu`);
};
export const GetUserStatConfig = () => {
  return GetFunc(`/statistic/countResourceAndUser`);
};

//  Managment API----------------------------------------------------------------

// Get all universities
export const GetBoshqarmaInfoConfig = () => {
  return GetFunc(`/management/userInfo`);
};
export const GetMyCollegesConfig = (params) => {
  return GetFunc(`/management/getAllEduAdmin?size=10${params ?? ""}`);
};
export const GetUniverDirectionsConfig = (params) => {
  return GetFunc(`/management/getAllDirectionEdu?size=10${params ?? ""}`);
};
export const GetUniverSubjectsConfig = (params) => {
  return GetFunc(`/management/getAllSubjectDirection?size=10${params ?? ""}`);
};
export const GetUniverThemesConfig = (params) => {
  return GetFunc(`/management/allTheme?size=10${params ?? ""}`);
};
export const GetUniverResourceConfig = (id) => {
  return GetFunc(`/management/getAllResource?themeId=${id}`);
};

// User APi----------------------------------------------------------------------------------

// Login Configs ----------------------------------------------------------
export const LoginConfig = (data) => {
  return CreateFunc("/auth/signInUser", data);
};

// Register Configs --------------------------------------------------------
export const RegisterConfig = (data) => {
  return CreateFunc("/auth/signUp", data);
};
export const RegisterCheckConfig = (data) => {
  return CreateFunc("/auth/validateUser", data);
};

// Get user info -----------------------------------------------------------
export const GetUserConfig = () => {
  return GetFunc(`/user/userInfo`);
};
export const GetUserSubjectsConfig = (params) => {
  return GetFunc(`/user/getSubjects?size=100${params ?? ""}`);
};
export const GetUserThemesConfig = (params) => {
  return GetFunc(`/user/allTheme?size=10${params ?? ""}`);
};
export const GetUserResourcesConfig = (id) => {
  return GetFunc(`/user/getAllResourceByUser?themeId=${id}`);
};
