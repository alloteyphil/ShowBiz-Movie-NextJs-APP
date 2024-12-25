import { footerLinks } from "@/data/footerLinks";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-[#111111]">
      <div className="flex flex-col justify-between  border-t-[0.5px] border-themeGray mt-20 pb-8">
        <div className="flex justify-between max-w-[1600px] w-full mx-auto py-36">
          <div className="flex flex-col gap-12">
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
            <ul key={i} className="flex flex-col gap-4">
              <li className="text-white text-lg uppercase">{link.title}</li>
              {link.links.map((l, i) => (
                <li key={i} className="text-white/60 text-base">
                  <Link href={l.href}>{l.title}</Link>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg uppercase">ShowBiz Studio</h4>
            <p className="text-white/60 text-base">123 Maplewood Lane</p>
            <p className="text-white/60 text-base">Sunnyvale</p>
            <p className="text-white/60 text-base">CA 94086</p>
          </div>
        </div>
        <div className="flex justify-between text-white w-full max-w-[1600px] mx-auto ">
          <p>ShowBiz Studio © {new Date().getFullYear()}</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
