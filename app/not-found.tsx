import Image from "next/image";
import notFoundImage from "../public/images/not-found.png";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-12 max-md:gap-6 text-white w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col min-h-screen gap-4 w-full justify-center items-center">
        <Image
          src={notFoundImage}
          alt="No results"
          className="w-56 max-md:w-32 object-contain"
          priority
        />
        <p className="text-themeGray text-center w-full text-lg max-md:text-base max-md:px-4">
          Oh no! We couldn't find what you were looking for
        </p>
      </div>
    </div>
  );
};

export default NotFound;
