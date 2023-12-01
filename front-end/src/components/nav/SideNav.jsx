import NavLink from "./NavLink";
import Logo from "../../assets/images/logo.png";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SideNav = ({ menu, handleSideNav }) => {
  const navList = menu.map((item, index) => (
    <NavLink handleSideNav={handleSideNav} key={index} {...item} />
  ));
  return (
    <div className="fixed inset-0 bg-[rgba(255,255,255,0.95)] z-[11]">
      <div className="bg-white flex justify-between py-[1.4rem] pl-[2rem] pr-[1.2rem] items-center border-b-[0.1rem] border-[#ececec]">
        <Link to="/" className="w-[47%] inline-block">
          <img src={Logo} alt="logo" />
        </Link>
        <div>
          <button className="p-2" onClick={handleSideNav}>
            <VscClose size={"3.2rem"} />
          </button>
        </div>
      </div>
      <ul className="overflow-y-auto h-[86vh]">{navList}</ul>
      <div></div>
    </div>
  );
};

export default SideNav;
