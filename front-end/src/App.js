import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
// import Collection from "./pages/Collection";
import Home from './pages/Home';
import Login from './pages/Login';
import LoginApplication from './pages/LoginApplication';
import Register from './pages/Register';
// import NotFound from "./pages/NotFound";
// import ProductDetails from "./pages/ProductDetails";
// import ProductsPage from "./pages/ProductsPage";
// import Sales from "./pages/Sales";

const Collection = lazy(() => import('./pages/Collection'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const Sales = lazy(() => import('./pages/Sales'));

function App() {
  return (
    <Routes>
      <Route path='/login-application' element={<LoginApplication />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path='category/:cateId'
          element={
            <Suspense fallback={<></>}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path='category/:cateId/:parentId'
          element={
            <Suspense fallback={<></>}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path='product/:productId'
          element={
            <Suspense fallback={<></>}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path='collection/:collectionId'
          element={
            <Suspense fallback={<></>}>
              <Collection />
            </Suspense>
          }
        />
        <Route
          path='sale/:salesId'
          element={
            <Suspense fallback={<></>}>
              <Sales />
            </Suspense>
          }
        />
        <Route
          path='NotFound'
          element={
            <Suspense fallback={<></>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<></>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
