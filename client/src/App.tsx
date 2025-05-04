import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

import Auth from "./views/auth/Auth";
import Invoices from "./views/invoices/Invoices";

import "./App.css";
import Layout from "./views/common/Layout";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <AppRoutes />
          </Router>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

const AppRoutes = () => {
  const token = useSelector((state: any) => state.token.token);

  return token ? <DefaultContainer /> : <LoginContainer />;
};

const LoginContainer = (): React.ReactNode => (
  <Routes>
    <Route path="/" element={<Auth />} />
  </Routes>
);

const DefaultContainer = (): React.ReactNode => (
  <Layout>
    <Routes>
      <Route path="/invoices" element={<Invoices />} />
      <Route path="*" element={<Navigate replace to="/invoices" />} />
    </Routes>
  </Layout>
);

export default App;
