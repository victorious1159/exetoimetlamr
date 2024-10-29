import Home from "./home";
import Product from "./productInCategary";
import WishList from "./wishlist";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import CartProtectedRoute from "./auth/CartProtectedRoute";
import { LayoutContext } from "./layout";
import { layoutState, layoutReducer } from "./layout/layoutContext";
import { isAdmin, isAuthenticate } from "./auth/fetchApi";
import PageNotFound from "./layout/PageNotFound";
import ProductDetails from "./productDetails";
import ProductByCategory from "./productInCategary/ProductByCategory";
import CheckoutPage from "./order/CheckoutPage";
import ContactUs from "./contactUs";
import custom from "./custom";
import Combo from "./combo";
import ComboDetails from "./comboDetails";

export {
  Home,
  Product,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  LayoutContext,
  layoutState,
  layoutReducer,
  isAdmin,
  isAuthenticate,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
  ContactUs,
  custom,
  Combo,
  ComboDetails
};
