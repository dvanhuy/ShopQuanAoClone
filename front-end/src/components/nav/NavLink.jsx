import { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Context } from "../Layout";

const NavLink = ({
  id,
  name,
  type = "category",
  children = [],
  handleSideNav,
}) => {
  const [openChildList, setOpenChildList] = useState(false);
  const { closeSearch } = useContext(Context);

  const onClick = () => {
    setOpenChildList(!openChildList);
  };

  const parentId = id;
  const childList = children.map(({ id, name }) => (
    <li key={id}>
      <Link
        onClick={() => {
          window.scrollTo(0, 0);
          handleSideNav();
        }}
        to={`${type}/${id}/${parentId}`}
        className="block w-[100%] p-[1rem] text-[1.4rem] uppercase font-[500] tracking-[0.13rem]"
      >
        {name}
      </Link>
    </li>
  ));

  return (
    <li className="border-[#ececec] border-b-[1px] md:border-b-0 overflow-hidden md:overflow-visible md:flex md:items-center">
      <div className="relative">
        <Link
          to={`${type}/${id}`}
          onClick={() => {
            window.scrollTo(0, 0);
            handleSideNav && handleSideNav();
            closeSearch();
          }}
          className="block w-[100%] p-[2rem] md:py-[1rem] text-[1.4rem] uppercase font-[600] tracking-[0.13rem] md:text-center md:px-[2rem] relative before:bg-black before:absolute before:top-[100%] before:w-0 before:h-[0.3rem] before:left-0 before:content-[''] before:block before:transition-all before:duration-300 before:origin-left lg:hover:before:w-[100%] hover:before:rounded-full"
        >
          {name}
        </Link>
        {childList?.length > 0 && (
          <button
            onClick={onClick}
            className="md:hidden absolute top-[14%] -translate-x-1/2 right-[-0.8rem] p-[0.8rem]"
          >
            <RiArrowDropDownLine size={28} />
          </button>
        )}
      </div>

      {
        <CSSTransition
          in={openChildList}
          classNames="grow-up"
          timeout={300}
          unmountOnExit
        >
          <ul className="ml-[2.4rem] overflow-hidden md:hidden">{childList}</ul>
        </CSSTransition>
      }
    </li>
  );
};

export default NavLink;
