"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-[14rem] h-[7rem] flex justify-between items-center px-[1.4rem] mb-[1.5rem] bg-[#1D1F24] rounded-[1.5rem] transition ease-in duration-300 cursor-pointer">
      <Link href="/metrics">
        <div
          className={`w-[5rem] h-[5rem] rounded-[1rem] flex justify-center gap-[0.3rem] flex-col items-center group ${
            isActive("/metrics") ? "bg-[#393c55]" : "hover:bg-[#393c55]"
          }`}
        >
          <Icon
            icon="fluent:data-usage-24-regular"
            className={`text-white text-[2.2rem] ${
              isActive("/metrics")
                ? "text-[#ccc] hidden"
                : "group-hover:text-[2.2rem]"
            } group-hover:hidden transition-all duration-300 ease-in`}
          />
          <Icon
            icon="fluent:data-usage-32-filled"
            className={`text-white text-[2.2rem] ${
              isActive("/metrics") ? "block" : "group-hover:block hidden"
            } transition-all duration-300 ease-in`}
          />
          <h1
            className={`text-[1rem] font-bold text-white transition-all duration-300 ease-in transform ${
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
          className={`w-[5rem] h-[5rem] rounded-[1rem] flex justify-center flex-col gap-[0.3rem] items-center group ${
            isActive("/lysa") ? "bg-[#393c55]" : "hover:bg-[#393c55]"
          }`}
        >
          <Icon
            icon="fa:assistive-listening-systems"
            className={`text-white text-[2.2rem] ${
              isActive("/lysa")
                ? "text-[#ccc] hidden"
                : "group-hover:text-[2.2rem]"
            } group-hover:hidden transition-all duration-300 ease-in`}
          />
          <Icon
            icon="fa6-solid:ear-listen"
            className={`text-white text-[2.2rem] ${
              isActive("/lysa") ? "block" : "group-hover:block hidden"
            } transition-all duration-300 ease-in`}
          />
          <h1
            className={`text-[1rem] font-bold text-white transition-all duration-300 ease-in transform ${
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
