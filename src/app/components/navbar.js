"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-[12rem] h-[5rem] md:w-[14rem] md:h-[6rem] flex justify-between items-center px-[1.4rem] mb-[1.5rem] md:mb-[0.5rem] bg-[#1D1F24] rounded-[1.5rem] transition ease-in duration-300 cursor-pointer">
      <Link href="/metrics">
        <div
          className={`w-[4rem] h-[3.5rem] md:w-[5rem] md:h-[4rem] rounded-[1rem] flex justify-center gap-[-0.8rem] md:gap-[-0.3rem] flex-col items-center group ${
            isActive("/metrics") ? "bg-[#393c55]" : "hover:bg-[#393c55]"
          }`}
        >
          <Icon
            icon="fluent:data-usage-24-regular"
            className={`text-white text-[1.5rem] md:text-[1.7rem] ${
              isActive("/metrics")
                ? "text-[#ccc] hidden"
                : "group-hover:text-[2.2rem]"
            } group-hover:hidden transition-all duration-300 ease-in`}
          />
          <Icon
            icon="fluent:data-usage-32-filled"
            className={`text-white text-[1.5rem] md:text-[1.7rem] ${
              isActive("/metrics") ? "block" : "group-hover:block hidden"
            } transition-all duration-300 ease-in`}
          />
          <h1
            className={`text-[0.8rem] md:text-[1rem] font-semibold text-white transition-all duration-300 ease-in transform ${
              isActive("/metrics")
                ? "translate-y-0 opacity-100"
                : "translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }`}
          >
            metrics
          </h1>
        </div>
      </Link>
      <Link href="/lysa">
        <div
          className={`w-[4rem] h-[3.5rem] md:w-[5rem] md:h-[4rem] rounded-[1rem] flex justify-center flex-col gap-[-0.8rem] md:gap-[-0.3rem] items-center group ${
            isActive("/lysa") ? "bg-[#393c55]" : "hover:bg-[#393c55]"
          }`}
        >
          <Icon
            icon="fa:assistive-listening-systems"
            className={`text-white text-[1.5rem] md:text-[1.8rem]  ${
              isActive("/lysa")
                ? "text-[#ccc] hidden"
                : "group-hover:text-[2.2rem]"
            } group-hover:hidden transition-all duration-300 ease-in`}
          />
          <Icon
            icon="fa6-solid:ear-listen"
            className={`text-white text-[1.5rem] md:text-[1.8rem]  ${
              isActive("/lysa") ? "block" : "group-hover:block hidden"
            } transition-all duration-300 ease-in`}
          />
          <h1
            className={`text-[1rem] font-semibold text-white transition-all duration-300 ease-in transform ${
              isActive("/lysa")
                ? "translate-y-0 opacity-100"
                : "translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }`}
          >
            lysa
          </h1>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
