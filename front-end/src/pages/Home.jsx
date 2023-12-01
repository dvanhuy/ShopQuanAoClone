import { useState, useEffect } from "react";
import Banner from "../components/slide/Banner";
import { getBanner } from "../services/salesAndCollectionService";
import { getCategory } from "../services/menuServices";
import CateNavList from "../components/nav/CateNavList";
import {
  getNewProducts,
  getWeeklyBestProducts,
} from "../services/productServices";
import NewProducts from "../components/slide/NewProducts";
import WeeklyBest from "../components/product/WeeklyBest";

const Home = () => {
  const [bannerList, setBannerList] = useState([]);
  const [cateList, setCateList] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [weeklyBest, setWeeklyBest] = useState([]);
  const [idCateNewProducts, setIdCateNewProducts] = useState(0);
  const [idCateWeeklyBest, setIdCateWeeklyBest] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const banners = await getBanner();
      setBannerList(banners);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategory();
      setCateList(categories);
      setIdCateNewProducts(categories[0].id ?? 0);
      setIdCateWeeklyBest(categories[0].id ?? 0);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const products = await getNewProducts(10, idCateNewProducts);
      setNewProducts(products);
    }

    fetchData();
  }, [idCateNewProducts]);

  useEffect(() => {
    async function fetchData() {
      const products = await getWeeklyBestProducts(8, idCateWeeklyBest);
      setWeeklyBest(products);
    }

    fetchData();
  }, [idCateWeeklyBest]);

  const handleClick =
    (section = "") =>
    (idCate = 0) =>
    (e) => {
      const btnList = [...e.target.parentNode.children];
      btnList.forEach((btn) => {
        btn.classList.remove("active");
      });

      e.target.classList.toggle("active");
      section === "new" && setIdCateNewProducts(idCate);
      section === "weekly-best" && setIdCateWeeklyBest(idCate);
    };

  return (
    <>
      <Banner bannerList={bannerList} />
      <CateNavList cateList={cateList} />
      <NewProducts
        products={newProducts}
        categories={cateList}
        changeNewProducts={handleClick("new")}
      />
      <WeeklyBest
        products={weeklyBest}
        categories={cateList}
        changeProducts={handleClick("weekly-best")}
      />
    </>
  );
};

export default Home;
