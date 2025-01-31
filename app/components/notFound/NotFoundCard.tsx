import Image from "next/image";
import noImage from "@public/images/no-image.png";

const NotFoundCard = () => {
  return (
    <div className="flex flex-col gap-8 items-center group">
      <div className="w-full h-[400px] overflow-hidden">
        <Image
          width={270}
          height={400}
          src={noImage}
          alt={"No Image"}
          className="object-cover w-full h-full object-center transition group-hover:scale-125 duration-700 ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-2 text-center max-w-[250px] text-wrap">
        <p className="text-xl font-semibold">Not found</p>
      </div>
    </div>
  );
};

export default NotFoundCard;
