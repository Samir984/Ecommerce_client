import Layout from "./components/Layout";
import GettingStarted from "./pages/auth/GettingStarted";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/auth/Auth";

import PageNotFound from "./pages/PageNotFound";
import AccountModeProvider from "./context/AccountContext";
import CustomerSignupForm from "./features/authentication/CusotmerSignupForm";
import VendorSignupForm from "./features/authentication/VendorSignupForm";
import SigninForm from "./features/authentication/SigninForm";

// import  store  from "./store";
// import { Provider } from "react-redux";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AccountModeProvider>
        <Routes>
          <Route path="/" element={<Layout />}></Route>

          {/*-------- auth route---------*/}
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="signup" element={<CustomerSignupForm />} />
            <Route path="become-vendor" element={<VendorSignupForm />} />
            <Route path="signin" element={<SigninForm />} />
          </Route>

          {/*-----------------page not found route-------------- */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AccountModeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
