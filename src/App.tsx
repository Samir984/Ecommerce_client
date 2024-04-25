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
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/customerPage/Home";
import ResultsPage from "./pages/customerPage/ResultsPage";
import { useEffect, useState } from "react";
import Product from "./features/product/Product";

import { Provider } from "react-redux";
import { store } from "./features/store";
import Cart from "./features/cart/Cart";

function App() {
  console.log("App");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Provider store={store}>
        {loading ? (
          <div className="w-full min-h-[100vh] flex justify-center items-center">
            <div className="fetchLoader"></div>
          </div>
        ) : (
          <BrowserRouter>
            <AccountStateProvider>
              <Routes>
                {/* ---------User Ui view --------- */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="results" element={<ResultsPage />} />
                  <Route path="product/:product_id" element={<Product />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<Profile />} />

                  {/* ------------ vendor route -------------- */}
                  <Route
                    path="vendor"
                    element={
                      <ProtectedRoute>
                        <Vendor />
                      </ProtectedRoute>
                    }
                  >
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
                    <Route path="profile" element={<Profile />} />
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
        )}
      </Provider>
    </>
  );
}

export default App;
