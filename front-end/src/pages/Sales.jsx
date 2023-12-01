import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/product/Loading";
import Product from "../components/product/Product";
import {
  getProductsSales,
  getSales,
} from "../services/salesAndCollectionService";
import { getSizes } from "../services/productServices";
import { getCategory } from "../services/menuServices";

const Sales = () => {
  const isMobile = window.innerWidth < 768;
  const { salesId } = useParams();
  const [sales, setSales] = useState({});
  const [sizes, setSizes] = useState([]);
  const [cateList, setCateList] = useState([]);
  const [filter, setFilter] = useState({
    saleId: salesId,
    cateId: -1,
    size: -1,
  });
  const saleRef = useRef({
    isComponentMounted: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { products, total } = await getProductsSales(
        filter.saleId,
        filter.size,
        filter.cateId,
        0
      );

      setSales((prev) => ({ ...prev, total, products }));
    }
    saleRef.current.isComponentMounted && fetchData();
  }, [filter.cateId, filter.saleId, filter.size]);

  useEffect(() => {
    async function fetchData() {
      Promise.all([getSales(salesId, 0), getCategory(), getSizes()]).then(
        (result) => {
          const [sales, categories, sizes] = result;
          !sales?.id && navigate("../NotFound");

          setSales(sales);
          setSizes(sizes);
          setCateList(categories);
          setFilter((prev) => ({ ...prev, cateId: categories[0]?.id }));
        }
      );
    }
    fetchData();
    saleRef.current.isComponentMounted = true;
  }, [navigate, salesId]);

  const onChange = (type, value) => (e) => {
    setFilter({ ...filter, [type]: value });
  };

  console.log(filter);

  const fetchMoreData = async () => {
    const hasMore = sales.products.length < sales.total;
    if (hasMore) {
      let { products } = await getProductsSales(
        filter.saleId,
        filter.size,
        filter.cateId,
        sales.products.length
      );
      const existsList = (sales?.product || []).map(({ id }) => id);
      products = products.filter(({ id }) => !existsList.includes(id));

      setSales({
        ...sales,
        products: [...(sales?.products || []), ...products],
      });
    }
  };

  const loading = (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-[1rem] py-[4.4rem]">
      <li className="nt5" key={1}>
        <Loading />
      </li>
      <li className="nt5" key={2}>
        <Loading />
      </li>
      <li className="nt5" key={3}>
        <Loading />
      </li>
      <li className="nt5" key={4}>
        <Loading />
      </li>
    </ul>
  );

  return (
    <div>
      <div
        className="pt-[125%] md:pt-[50%] bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            isMobile ? sales?.mobileBanner : sales?.pcBanner
          })`,
        }}
      />

      <ul className="grid grid-cols-2 gap-[1rem] py-[1rem] md:gap-[2rem] md:py-[2rem] ">
        {cateList.map(({ id, img }) => (
          <li key={id} className="relative">
            <label>
              <input
                type="radio"
                name="category"
                onChange={onChange("cateId", id)}
                className="appearance-none absolute peer"
                checked={filter.cateId === id}
              />
              <span
                className="block pt-[30%] bg-center bg-no-repeat bg-cover hover:brightness-90 transition-all duration-300 "
                style={{
                  backgroundImage: `url(${img})`,
                }}
              ></span>
            </label>
          </li>
        ))}
      </ul>
      <div>
        <h2 className="font-semibold text-center text-[2rem] mt-[3rem]">
          CHỌN SIZE CỦA BẠN
        </h2>
        <ul className="grid grid-cols-5 gap-[1rem] md:gap-[2rem] mt-[1rem] md:px-[15%] lg:px-[25%]">
          {sizes.map(({ id, size }) => (
            <li key={size} className="relative">
              <label>
                <input
                  type="radio"
                  name="size"
                  onChange={onChange("size", size)}
                  className="appearance-none absolute peer"
                  checked={filter.size === size}
                />
                <span className="block font-semibold text-[1.6rem] border rounded-[0.4rem] hover:bg-black hover:text-white text-center py-[1rem] peer-checked:bg-black peer-checked:text-white transition-all duration-300">
                  {size}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {sales?.total < 0 && loading}
      {sales.total === 0 && (
        <h3 className="py-[4.4rem] text-center text-[1.6rem] font-semibold">
          Không có sản phẩm nào!
        </h3>
      )}
      {sales?.total > 0 && (
        <InfiniteScroll
          dataLength={sales?.products?.length}
          next={fetchMoreData}
          hasMore={sales?.products?.length < sales?.total}
          loader={loading}
          scrollThreshold={0.7}
        >
          {
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-[1rem] py-[4.4rem] md:px-[2rem] lg:px-[6.4rem]">
              {sales?.products.map((product) => (
                <li key={product.id}>
                  <Product {...product} />
                </li>
              ))}
            </ul>
          }
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Sales;
