import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../shared/Button";
import Product from "../product/Product";

const NewProducts = ({ products = [], categories = [], changeNewProducts }) => {
  const windowWidth = window.innerWidth;
  return (
    <section className="py-[2.5rem] bg-[#aabec6]  md:px-[2rem] md:py-[2.5rem] ">
      <h1 className="text-center text-[2.8rem] text-[#ffffff] font-semibold md:text-[4.6rem]">
        WHAT'S NEW
      </h1>
      <div className="py-[2rem] text-white flex gap-[1rem] justify-center">
        {categories.map((category, index) => (
          <Button
            key={category.id}
            {...category}
            type="underline"
            onclick={changeNewProducts(category.id)}
            active={index === 0 ? "active" : ""}
            beforeColor="before:bg-white"
          />
        ))}
      </div>
      <Swiper
        autoplay={{
          delay: 3500,
        }}
        slidesPerView={(windowWidth / 420).toFixed() * 1 + 0.2}
        spaceBetween={windowWidth < 768 ? 10 : 20}
        modules={[Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="text-white">
            <Product {...product} textcolor="#f1f1f1" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewProducts;
