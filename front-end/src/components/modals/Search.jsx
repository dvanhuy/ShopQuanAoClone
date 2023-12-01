import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { search } from "../../services/productServices";
import Loading from "../product/Loading";
import Products from "../product/Products";

function Search({ handleSearch }) {
  const [searchStr, setSearchStr] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const rs = await search(searchStr);
      setTimeout(() => {
        setProductList(rs);
      }, 260);
    }

    getProducts();
  }, [searchStr]);

  const onChange = (e) => {
    setSearchStr(e.target.value);
  };

  return (
    <div className="mt-[5.8rem] fixed inset-0 lg:px-[6.4rem] bg-white z-10">
      <div className="grid grid-cols-[25%_1fr_25%] gap-[10%] items-center border-b border-[#ececec] p-[0.6rem] px-[0.6rem]">
        <div>
          <button className="p-3.5" onClick={handleSearch}>
            <MdKeyboardBackspace size="2.8rem" />
          </button>
        </div>
        <h2 className="text-center text-[1.6rem] font-semibold ">TÌM KIẾM</h2>
      </div>
      <div className="text-center px-[2rem]">
        <input
          type="text"
          autoFocus
          placeholder="Tìm kiếm ..."
          className="p-[1rem] text-[1.3rem] border-2 border-[#aeaeae] rounded-md w-[80%] md:w-[50%] mt-[2rem] font-semibold outline-none"
          onChange={onChange}
        />
        <h2 className="text-[2rem] mt-[1rem] font-semibold">GỢI Ý CHO BẠN</h2>

        {!searchStr && productList.length === 0 && (
          <div className="grid grid-cols-40 md:grid-cols-3 lg:grid-cols-4 py-[2rem] gap-[2rem]">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        )}

        {searchStr && productList.length === 0 && (
          <p className="font-[500] text-[1.8rem] mt-[10rem]">
            Không tìm thấy sản phẩm nào!
          </p>
        )}

        {productList.length !== 0 && <Products products={productList} />}
      </div>
    </div>
  );
}

export default Search;
