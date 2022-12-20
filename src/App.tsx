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
  Statistcs,
  MuassasaTheme,
  MuassasaSubject,
  MuassasaDirection,
} from "./pages";
import "src/styles/App.scss";
import { role, token } from "./server/Host";
import React from "react";

const App: React.FC = () => {
  return (
    <Router>
      {/* All pages rendered here */}
      <Routes>
        {/* Login page */}
        <Route
          index
          element={
            token && role == "ROLE_EDUADMIN" ? (
              <Navigate to="/college/statistcs" />
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

        {/* Status page */}
        <Route path="/qabul.jsp" element={<Status />} />

        {/* Not found page */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
