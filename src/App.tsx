import Layout from "./components/Layout";
import GettingStarted from "./pages/authpage/GettingStarted";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/authpage/Auth";

import PageNotFound from "./pages/PageNotFound";
import SignupForm from "./features/authentication/SignupForm";

import SigninForm from "./features/authentication/SigninForm";
import AccountStateProvider from "./context/AccountContext";
import Vendor from "./pages/vendorPage/Vendor";
import Store from "./features/store/Store";
import ViewOrder from "./features/order/ViewOrder";
import ToasterCompoent from "./lib/Toaster";
import CreateStoreForm from "./features/store/CreateStoreForm";
import ListProductForm from "./features/product/ListProductForm";
import EditProduct from "./features/product/EditProduct";
import Profile from "./features/profile/Profile";
// import EditProduct from "./features/store/EditProduct";

// import store from "./store";
// import { Provider } from "react-redux";

function App() {
  console.log("App");
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AccountStateProvider>
        <Routes>
          {/* ---------User Ui view --------- */}
          <Route path="/" element={<Layout />}>
            <Route path="vendor" element={<Vendor />}>
              <Route path="store/:store_id" element={<Store />} />
              <Route path="create-store" element={<CreateStoreForm />} />
              <Route
                path="list-product"
                element={<ListProductForm mode="List" />}
              />
              <Route
                path="edit-product/:product_id"
                element={<EditProduct />}
              />
              <Route
                path="profile"
                element={<Profile />}
              />
              <Route path="order" element={<ViewOrder />} />
            </Route>
          </Route>

          {/*-------- auth route---------*/}
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="signup" element={<SignupForm />} />
            <Route path="become-vendor" element={<SignupForm />} />
            <Route path="signin" element={<SigninForm />} />
          </Route>

          {/*-----------------page not found route-------------- */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AccountStateProvider>
      <ToasterCompoent />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
