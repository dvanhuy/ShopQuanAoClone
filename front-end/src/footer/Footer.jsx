import { ImFacebook, ImYoutube } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { Link, useHref } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-[6rem] pb-[4rem] px-[2rem] bg-[#f7f7f7]">
      <div className="flex flex-col lg:flex-row gap-[2.4rem]">
        <div className="flex-1">
          <h4 className="uppercase font-semibold text-[1.6rem] mb-[1.2rem]">
            ssstutter
          </h4>
          <p className="text-[#acacac] text-[1.4rem] font-medium w-[80%]">
            Với thông điệp "Refined Life", SSStutter mong muốn đem đến cho khách
            hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="uppercase font-semibold text-[1.6rem] mb-[1.2rem]">
            Chi nhánh Hà Nội
          </h4>
          <div className="text-[#acacac] text-[1.4rem] font-medium">
            <p>105 - D6, ngõ 4B Đặng Văn Ngữ</p>
            <p>70 Tô Hiến Thành</p>
            <p>167 Cầu Giấy</p>
            <p>46 Đông Các</p>
          </div>
          <br />
          <h4 className="uppercase font-semibold text-[1.6rem] mb-[1.2rem]">
            Chi nhánh TP. Hồ Chí Minh
          </h4>
          <div className="text-[#acacac] text-[1.4rem] font-medium">
            <p>Lầu 1, số 25, Nguyễn Trãi, Q1</p>
            <p>152 Nguyễn Gia Trí, Bình Thạnh</p>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="uppercase font-semibold text-[1.6rem] mb-[1.2rem]">
            Liên hệ
          </h4>
          <div className="text-[#acacac] text-[1.4rem] font-medium">
            <p>Hotline: 086 993 6266</p>
            <p>Email: info@ssstutter.com</p>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="uppercase font-semibold text-[1.6rem] mb-[1.2rem]">
            Social
          </h4>
          <div className="flex ">
            <a href="/" className="pr-[2.4em]">
              <ImFacebook size={"2.4rem"} fill={"#808080"} />
            </a>
            <a href="/" className="pr-[2.4em]">
              <AiFillInstagram size={"2.4rem"} fill={"#808080"} />
            </a>
            <a href="/" className="pr-[2.4em]">
              <ImYoutube size={"2.4rem"} fill={"#808080"} />
            </a>
            <a href="/" className="pr-[2.4em]">
              <FaTiktok size={"2.4rem"} fill={"#808080"} />
            </a>
          </div>
        </div>
      </div>

      <p className="text-[#acacac] text-[1.4rem] font-medium border-t border-[#bbb] mt-[4rem] pt-[4rem]">
        Clone{" "}
        <a
          className="font-semibold hover:opacity-80"
          href="https://ssstutter.com"
          target="_blank"
          rel="noreferrer"
        >
          ssstutter
        </a>
      </p>
    </footer>
  );
};

export default Footer;
