import { Link } from "react-router-dom";

const CateNav = ({ id, img, type }) => {
  return (
    <Link
      to={`${type}/${id}`}
      style={{ backgroundImage: `url(${img})` }}
      className=" block pt-[50%] bg-center bg-no-repeat bg-cover hover:brightness-90 transition-all duration-300"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    />
  );
};

export default CateNav;
