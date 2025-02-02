import Image from "next/image";
import notFoundImage from "../public/images/not-found.png";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-24 text-white w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
        <Image src={notFoundImage} alt="No results" className="w-56" />
        <p className="text-themeGray text-center w-full">
          Oh no! We couldn't find what you were looking for
        </p>
      </div>
    </div>
  );
};

export default NotFound;
