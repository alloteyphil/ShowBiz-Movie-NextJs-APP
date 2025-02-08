import { footerLinks } from "@/data/footerLinks";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-[#111111]">
      <Subscribe />
      <div className="flex flex-col lg:justify-between max-md:gap-4 border-t-[0.5px] border-themeGray pb-8 max-md:px-4 max-xl:px-8 xl:px-32 max-md:py-12 md:py-28 text-sm">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between md:max-w-[1300px] lg:max-w-[1600px] w-full md:mx-auto gap-12 max-md:gap-4 lg:gap-16">
          <div className="flex flex-col gap-10 max-md:gap-4 max-md:mb-4">
            <Link
              href={"/"}
              className="text-white text-4xl font-black cursor-pointer"
            >
              ShowBiz
            </Link>
            <div className="flex gap-4">
              <Link href="#">
                <FacebookIcon
                  size={16}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <TwitterIcon
                  size={16}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <InstagramIcon
                  size={16}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <YoutubeIcon
                  size={16}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap md:gap-16 lg:gap-24 max-md:flex-col">
            {footerLinks.map((link, i) => (
              <ul key={i} className="flex flex-col max-md:mt-8 gap-4 w-[190px]">
                <li className="text-white uppercase font-bold">{link.title}</li>
                {link.links.map((l, i) => (
                  <li key={i} className="text-themeGray">
                    <Link href={l.href}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            ))}
            <div className="hidden max-md:hidden max-xl:flex flex-col gap-4 max-md:mt-8">
              <h4 className="text-white uppercase font-bold">ShowBiz Studio</h4>
              <p className="text-themeGray">123 Maplewood Lane</p>
              <p className="text-themeGray">Sunnyvale</p>
              <p className="text-themeGray">CA 94086</p>
            </div>
          </div>

          <div className="flex max-xl:hidden max-md:flex flex-col gap-4 max-md:mt-8">
            <h4 className="text-white uppercase font-bold">ShowBiz Studio</h4>
            <p className="text-themeGray">123 Maplewood Lane</p>
            <p className="text-themeGray">Sunnyvale</p>
            <p className="text-themeGray">CA 94086</p>
          </div>
        </div>

        <div className="flex flex-col mt-20 max-md:mt-12 md:flex-row justify-between text-white w-full md:max-w-[1300px] lg:max-w-[1600px] mx-auto  text-center md:text-left">
          <p>ShowBiz Studio © {new Date().getFullYear()}</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
