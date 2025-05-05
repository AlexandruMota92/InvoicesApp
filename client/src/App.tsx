import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import store from "./utils/store/store";

import Auth from "./pages/auth/Auth";
import Invoices from "./pages/invoices/Invoices";
import Layout from "./components/Layout";
import "./App.css";

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
    <Route path="*" element={<Navigate replace to="/" />} />
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
