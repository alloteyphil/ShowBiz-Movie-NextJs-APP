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
      <div className="flex flex-col md:justify-between max-md:gap-4 border-t-[0.5px] border-themeGray pb-8 max-md:py-12 max-md:px-8 text-sm">
        <div className="flex max-md:flex-col md:justify-between md:max-w-[1600px] w-full md:mx-auto md:py-36">
          <div className="flex flex-col gap-12 max-md:gap-4 max-md:mb-4">
            <Link
              href={"/"}
              className="text-white text-4xl font-black cursor-pointer"
            >
              ShowBiz
            </Link>
            <div className="flex gap-4">
              <Link href="#">
                <FacebookIcon
                  size={14}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <TwitterIcon
                  size={14}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <InstagramIcon
                  size={14}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
              <Link href="#">
                <YoutubeIcon
                  size={14}
                  className="cursor-pointer"
                  color="#fff"
                />
              </Link>
            </div>
          </div>
          {footerLinks.map((link, i) => (
            <ul key={i} className="flex flex-col max-md:mt-8 gap-4">
              <li className="text-white uppercase">{link.title}</li>
              {link.links.map((l, i) => (
                <li key={i} className="text-themeGray">
                  <Link href={l.href}>{l.title}</Link>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex flex-col gap-4 max-md:mt-8">
            <h4 className="text-white uppercase">ShowBiz Studio</h4>
            <p className="text-themeGray">123 Maplewood Lane</p>
            <p className="text-themeGray">Sunnyvale</p>
            <p className="text-themeGray">CA 94086</p>
          </div>
        </div>
        <div className="flex justify-between text-white w-full max-w-[1600px] mx-auto max-md:mt-8">
          <p>ShowBiz Studio © {new Date().getFullYear()}</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
