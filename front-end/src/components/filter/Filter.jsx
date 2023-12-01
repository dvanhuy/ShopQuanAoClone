import Slider from "rc-slider";
import { RiArrowDropDownLine } from "react-icons/ri";
import NumberFormat from "react-number-format";

const Filter = ({
  onFilterClick,
  filter,
  maxPrice,
  onFilter,
  colors,
  sizes,
}) => {
  return (
    <ul className="lg:sticky lg:top-[7.8rem] lg:p-0 text-[1.8rem] lg:text-[1.4rem] px-[2rem] lg:pr-[1rem] pt-[1rem] overflow-y-auto h-[86vh] scrollbar">
      <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem] overflow-hidden transition-all duration-300 bg-white">
        <button
          onClick={onFilterClick}
          className="flex w-[100%] justify-between font-semibold"
        >
          Mức giá <RiArrowDropDownLine size={24} />
        </button>
        <p className="pt-[1rem] font-medium text-[1.4rem]">
          {filter.price[0] < filter.price[1] || filter.price[1] === -1 ? (
            <>
              Từ{" "}
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={filter.price[0]}
                decimalSeparator="."
                displayType="text"
                thousandSeparator={true}
              />
              <span className="text-[1.4rem] md:text-[2rem]">₫</span>
              {" đến "}
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={
                  filter.price[1] === -1 ? maxPrice + 1000 : filter.price[1]
                }
                decimalSeparator="."
                displayType="text"
                thousandSeparator={true}
              />
              <span className="text-[1.4rem] md:text-[2rem]">₫</span>
            </>
          ) : (
            <>
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={
                  filter.price[1] === -1 ? maxPrice + 1000 : filter.price[1]
                }
                decimalSeparator="."
                displayType="text"
                thousandSeparator={true}
              />
              <span className="text-[2rem]">₫</span>
            </>
          )}
        </p>
        <div className="px-[1rem] pb-[3rem]">
          {maxPrice && (
            <Slider
              trackStyle={{
                backgroundColor: "#000",
              }}
              handleStyle={{
                borderColor: "#000",
              }}
              activeDotStyle={{
                borderColor: "#000",
              }}
              range
              step={10}
              min={0}
              max={((maxPrice + 1000) / 1000) | 0}
              defaultValue={[0, ((maxPrice + 1000) / 1000) | 0]}
              marks={{
                0: 0,
                [((maxPrice + 1000) / 1000) | 0]:
                  ((maxPrice + 1000) / 1000) | 0,
              }}
              onChange={onFilter("price", "range")}
            />
          )}
        </div>
      </li>
      <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white ">
        <button
          onClick={onFilterClick}
          className="flex w-[100%] justify-between font-semibold"
        >
          Màu sắc <RiArrowDropDownLine size={24} />
        </button>
        <div className="relative">
          <div className="mt-[2rem] pb-[2rem] text-[1.4rem] font-[500] grid grid-cols-2 gap-[1.4rem] relative max-h-[52vh] items-stretch overflow-y-auto scrollbar">
            {colors.map(({ id, name }) => (
              <div key={id}>
                <input
                  id={`color${id}`}
                  type="checkbox"
                  className="appearance-none peer absolute"
                  value={id}
                  name="colors"
                  checked={filter?.colors.includes(id)}
                  onChange={onFilter("colors", "checkbox")}
                />
                <label
                  htmlFor={`color${id}`}
                  className="peer-checked:bg-black peer-checked:text-white h-[100%] transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
                >
                  {name}
                </label>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[4rem] bg-gradient-to-t from-white"></div>
        </div>
      </li>
      <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
        <button
          onClick={onFilterClick}
          className="flex w-[100%] justify-between font-semibold"
        >
          Kích cỡ <RiArrowDropDownLine size={24} />
        </button>
        <div className="py-[2rem] text-[1.6rem] font-[500] grid grid-cols-5 gap-[1.4rem] overflow-y-auto max-h-[60vh]">
          {sizes.map(({ size }) => (
            <div key={size} className="relative">
              <input
                id={`size${size}`}
                type="checkbox"
                className="appearance-none peer absolute"
                value={size}
                checked={filter?.sizes.includes(size)}
                name="sizes"
                onChange={onFilter("sizes", "checkbox")}
              />
              <label
                htmlFor={`size${size}`}
                className="peer-checked:bg-black peer-checked:text-white transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </li>
      <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
        <button
          onClick={onFilterClick}
          className="flex w-[100%] justify-between font-semibold"
        >
          Sắp xếp <RiArrowDropDownLine size={24} />
        </button>
        <div className="py-[2rem] text-[1.6rem] font-[500] grid grid-cols-2 gap-[1.4rem] overflow-y-auto max-h-[60vh]">
          {[
            { text: "Giá giảm dần", value: "desc" },
            { text: "Giá tăng dần", value: "asc" },
          ].map(({ text, value }, index) => (
            <div key={index} className="relative">
              <input
                id={`sort${value}`}
                type="checkbox"
                className="appearance-none peer absolute"
                value={value}
                name="sort"
                onChange={onFilter("sort", "radio")}
                checked={filter.sort === value}
              />
              <label
                htmlFor={`sort${value}`}
                className="peer-checked:bg-black peer-checked:text-white transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
              >
                {text}
              </label>
            </div>
          ))}
        </div>
      </li>
    </ul>
  );
};

export default Filter;
