import CateNav from "./CateNav";

const CateNavList = ({ cateList }) => {
  const navList = cateList.map((cate) => <CateNav key={cate.id} {...cate} />);
  return (
    <div className="grid grid-cols-2 gap-[1rem] py-[1rem] md:gap-[2rem] md:py-[2rem]">
      {navList}
    </div>
  );
};

export default CateNavList;
