import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/product/Loading";
import Product from "../components/product/Product";
import {
  getCollection,
  getProductsCollection,
} from "../services/salesAndCollectionService";

const Collection = () => {
  const isMobile = window.innerWidth < 768;
  const { collectionId } = useParams();
  const [collection, setCollection] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const rs = await getCollection(
        collectionId,
        collection?.products?.length || 0
      );
      !rs?.id && navigate("../NotFound");
      setCollection(rs);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  const fetchMoreData = async () => {
    const hasMore = collection.products.length < collection.total;
    if (hasMore) {
      const rs = await getProductsCollection(
        collectionId,
        collection.products.length
      );
      setCollection({
        ...collection,
        products: [...collection.products, ...rs],
      });
    }
  };

  const loading = (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-[1rem] py-[4.4rem]">
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
    </ul>
  );

  return (
    <div>
      <div
        className="block pt-[125%] md:pt-[50%] bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            isMobile ? collection?.mobileBanner : collection?.pcBanner
          })`,
        }}
      />
      {collection?.total < 0 && loading}
      {collection?.total > 0 && (
        <InfiniteScroll
          dataLength={collection?.products?.length}
          next={fetchMoreData}
          hasMore={collection?.products?.length < collection?.total}
          loader={loading}
          scrollThreshold={0.7}
        >
          {
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-[1rem] py-[4.4rem] md:px-[2rem] lg:px-[6.4rem]">
              {collection?.products.map((product) => (
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

export default Collection;
