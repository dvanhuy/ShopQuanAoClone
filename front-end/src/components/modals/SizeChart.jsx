import { useState } from "react";

import HimSize from "../../assets/images/HimSize.jpg";
import Button from "../../shared/Button";
import { capitalize } from "../../utils/capitalizeString";

const SizeChart = ({ list }) => {
  const [sizeChart, setSizeChart] = useState({
    gender: "nam",
    img: HimSize,
  });

  return (
    <div className="bg-white p-[2rem] rounded-[0.6rem] lg:w-[60%] lg:h-[90vh] overflow-y-auto scrollbar">
      <div className="grid grid-cols-2 gap-[1rem] px-[30%] pt-[2rem]">
        {list.map(({ gender, img }) => (
          <Button
            onclick={() => {
              setSizeChart({ gender, img });
            }}
            key={gender}
            text={capitalize(gender)}
            type={gender === sizeChart.gender ? "" : "outline"}
          />
        ))}
      </div>
      <img src={sizeChart.img} alt="size chart" className="w-[100%] " />
    </div>
  );
};

export default SizeChart;
