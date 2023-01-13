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
  Vazirlik,
  VazirlikHome,
} from "./pages";
import "src/styles/App.scss";
import { isAdmin, isManagment, isMinistry, isUser } from "./server/Host";
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
            element={isUser() ? <Profile /> : <Navigate to="/" />}
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

        {/* Login page for admins*/}
        <Route
          path="login"
          element={
            isAdmin() ? (
              <Navigate to="/college/statistcs" />
            ) : isManagment() ? (
              <Navigate to="/administration/statistcs" />
            ) : (
              <Login />
            )
          }
        />

        {/* Login page for admins*/}
        <Route
          path="super"
          element={
            isMinistry() ? (
              <Navigate to="/ministry/statistcs" />
            ) : (
              <Login isMinistry={true} />
            )
          }
        />

        {/* Musassasa pages */}
        <Route
          path="college"
          element={isAdmin() ? <Muassasa /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="statistcs" />} />
          <Route path="sozlama" element={<Sozlama />} />
          <Route path="statistcs" element={<Statistcs />} />
          <Route path="directions">
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
          element={isManagment() ? <Boshqarma /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="statistcs" />} />
          <Route path="sozlama" element={<Sozlama />} />
          <Route path="statistcs" element={<Statistcs />} />
          <Route path="universities">
            <Route index element={<BoshqarmaUniversities />} />
            <Route path=":directions">
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

        {/* Ministry page */}
        <Route
          path="ministry"
          element={isMinistry() ? <Vazirlik /> : <Navigate to="/super" />}
        >
          <Route index element={<Navigate to="statistcs" />} />
          {/* <Route path="sozlama" element={<Sozlama />} /> */}
          <Route path="statistcs" element={<Statistcs />} />
          <Route path="regions">
            <Route index element={<VazirlikHome />} />
            <Route path=":universities">
              <Route index element={<BoshqarmaUniversities />} />
              <Route path=":directions">
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
