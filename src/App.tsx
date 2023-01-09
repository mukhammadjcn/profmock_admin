import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Login,
  Status,
  Sozlama,
  NotFound,
  Muassasa,
  Boshqarma,
  Statistcs,
  MuassasaTheme,
  MuassasaSubject,
  MuassasaDirection,
  BoshqarmaUniversities,
  Home,
  Profile,
  MyInfo,
  Resources,
  Theme,
  UserLogin,
} from "./pages";
import "src/styles/App.scss";
import { role, token } from "./server/Host";
import React from "react";

const App: React.FC = () => {
  return (
    <Router>
      {/* All pages rendered here */}
      <Routes>
        {/* User pages */}
        <Route path="">
          <Route index element={<Home />} />
          <Route path="/kirish" element={<UserLogin />} />

          <Route
            path="profile"
            element={token ? <Profile /> : <Navigate to="/" />}
          >
            <Route index element={<MyInfo />} />

            <Route path="resources">
              <Route index element={<Resources />} />
              <Route path=":theme">
                <Route index element={<Theme />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Login page */}
        <Route
          path="login"
          element={
            token && role == "ROLE_EDUADMIN" ? (
              <Navigate to="/college/statistcs" />
            ) : token && role == "ROLE_MANAGEMENTADMIN" ? (
              <Navigate to="/administration/statistcs" />
            ) : (
              <Login />
            )
          }
        />

        {/* Musassasa pages */}
        <Route
          path="college"
          element={
            token && role == "ROLE_EDUADMIN" ? (
              <Muassasa />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route index element={<Navigate to="statistcs" />} />
          <Route path="sozlama" element={<Sozlama />} />
          <Route path="statistcs" element={<Statistcs />} />
          <Route path="direction">
            <Route index element={<MuassasaDirection />} />
            <Route path=":subject">
              <Route index element={<MuassasaSubject />} />
              <Route path=":theme">
                <Route index element={<MuassasaTheme />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Administration pages */}
        <Route
          path="administration"
          element={
            token && role == "ROLE_MANAGEMENTADMIN" ? (
              <Boshqarma />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route index element={<Navigate to="statistcs" />} />
          <Route path="sozlama" element={<Sozlama />} />
          <Route path="statistcs" element={<Statistcs />} />
          <Route path="universities">
            <Route index element={<BoshqarmaUniversities />} />
            <Route path=":direction">
              <Route index element={<MuassasaDirection />} />
              <Route path=":subject">
                <Route index element={<MuassasaSubject />} />
                <Route path=":theme">
                  <Route index element={<MuassasaTheme />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Status page */}
        <Route path="/qabul.jsp" element={<Status />} />

        {/* Not found page */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
