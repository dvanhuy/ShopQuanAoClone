import NotFoundImg from "../assets/images/NotFoundImg.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-[4.4rem]">
      <img src={NotFoundImg} className="lg:max-w-[50%]" alt="NotFoundImg" />
      <p className="font-semibold text-[1.8rem]"> Không tìm thấy kết quả!</p>
    </div>
  );
};

export default NotFound;
