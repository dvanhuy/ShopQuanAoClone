import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import { Link } from "react-router-dom";

const Banner = ({ bannerList }) => {
  const isMobile = window.innerWidth <= 768;
  return (
    <Swiper
      autoplay={{
        delay: 3000,
      }}
      modules={[Autoplay]}
    >
      {bannerList.map(({ id, type, mobileBanner, pcBanner }, index) => (
        <SwiperSlide key={index}>
          <Link
            to={`${type}/${id}`}
            className="block pt-[125%] md:pt-[50%] bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${isMobile ? mobileBanner : pcBanner})`,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
