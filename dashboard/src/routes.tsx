import App from "App";
import Admin from "pages/Admin";
import AdminGuard from "pages/AdminGuard";
import AdminServer from "pages/AdminServer";
import Auth from "pages/Auth";
import AuthGuard from "pages/AuthGuard";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Premium from "pages/Premium";
import Server from "pages/Server";
import Settings from "pages/Settings";
import SubscriptionPage from "pages/Subscription";
import Track from "pages/Track";
import { createRoutesFromElements, Navigate, Route } from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route element={<AuthGuard redirectTo="/" />}>
        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path=":serverId" element={<Server />}>
            <Route index element={<Navigate to="settings" replace={true} />} />
            <Route path="settings" element={<Settings />} />
            <Route path="track" element={<Track />} />
            <Route path="subscription" element={<SubscriptionPage />} />
          </Route>
        </Route>
      </Route>
      <Route element={<AdminGuard redirectTo="/" />}>
        <Route path="admin">
          <Route index element={<Admin />} />
          <Route path=":serverId" element={<AdminServer />} />
        </Route>
      </Route>
      <Route
        element={
          <AuthGuard>
            <h5>Please login to see the available plans</h5>
          </AuthGuard>
        }
      >
        <Route path="premium" element={<Premium />} />
      </Route>
      <Route path="*" element={<h1>404 - Not found</h1>} />
    </Route>
  </>
);

export default routes;
