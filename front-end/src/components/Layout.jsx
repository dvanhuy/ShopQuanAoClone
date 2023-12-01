import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Header from "../header/Header";
import SideNav from "./nav/SideNav";
import Search from "../components/modals/Search";
import { getMenu } from "../services/menuServices";
import Footer from "../footer/Footer";
import MiniCart from "./modals/MiniCart";
import { useRef } from "react";
import Overlay from "./modals/Overlay";

const Context = React.createContext();
const Layout = () => {
  const [openedSideNav, setOpenedSideNav] = useState(false);
  const [openedSearch, setOpenedSearch] = useState(false);
  const [menu, setMenu] = useState([]);
  const cartRef = useRef();
  const headerRef = useRef();
  const overlayRef = useRef();
  const { addToCart, openMiniCart, closeMiniCart, loadItems } =
    cartRef.current || {};
  const { setCartQty } = headerRef.current || {};
  const { openOverlay, closeOverlay } = overlayRef.current || {};

  useEffect(() => {
    async function fetchData() {
      const menu_data = await getMenu();
      setMenu(menu_data);
    }

    fetchData();
  }, []);

  const handleSideNav = () => {
    setOpenedSideNav(!openedSideNav);
  };
  const handleSearch = () => {
    setOpenedSearch(!openedSearch);
  };
  const closeSearch = () => {
    setOpenedSearch(false);
  };

  return (
    <Context.Provider
      value={{
        closeSearch,
        openMiniCart,
        closeMiniCart,
        addToCart,
        setCartQty,
        loadItems,
        openOverlay,
        closeOverlay,
      }}
    >
      <Header
        handleSideNav={handleSideNav}
        handleSearch={handleSearch}
        menu={menu}
        ref={headerRef}
      />
      <CSSTransition
        in={openedSideNav}
        classNames="slide-up"
        timeout={300}
        unmountOnExit
      >
        <SideNav menu={menu} handleSideNav={handleSideNav} />
      </CSSTransition>

      <CSSTransition
        in={openedSearch}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <Search handleSearch={handleSearch} />
      </CSSTransition>
      <MiniCart ref={cartRef} />
      <Overlay ref={overlayRef} />
      <main className="mt-[5.8rem]">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
};

export default Layout;
export { Context };
