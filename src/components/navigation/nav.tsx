"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { gnb, mainMenu } from "./menuData";
import MenuItem from "./MenuItem";
import useLogout from "@/hooks/query/useLogout";
import { useGetUser } from "@/hooks/queries/useGetUser";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: handleLogout } = useLogout();

  const { data } = useGetUser();

  return (
    <nav className="flex md:w-full md:mx-2 justify-between">
      <div className="hidden md:flex w-full items-center justify-between text-xs text-gray-400">
        <div className="flex gap-6 ml-6">
          {mainMenu.map((item, index) => (
            <MenuItem
              key={`main-${index}`}
              label={item.label}
              link={item.link}
              className="font-bold text-lg"
            />
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="검색"
            className="border px-4 py-2 mx-10 rounded-full w-full focus:bg-slate-100 focus:outline-none border-slate-400"
          />
        </div>
        <div className="flex gap-4">
          {!data?.isLoggedIn
            ? null
            : gnb.map((item, index) => (
                <MenuItem
                  key={`gnb-${index}`}
                  label={item.label}
                  link={item.link}
                />
              ))}

          {!data?.isLoggedIn ? (
            <>
              <MenuItem label="로그인" link="/login" />
              <MenuItem label="회원가입" link="/sign-up" />
            </>
          ) : (
            <li className=" list-none">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="hover:text-gray-700"
              >
                로그아웃
              </a>
            </li>
          )}
        </div>
      </div>

      {/* 모바일용 햄버거 메뉴 */}
      <div className="md:hidden " onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size={55} />
        <div
          className={`fixed top-0 right-0 w-[140px] h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-start p-5">
            {mainMenu.map((item, index) => (
              <MenuItem
                key={index}
                label={item.label}
                link={item.link}
                className="py-3"
              />
            ))}
          </ul>

          <ul className="flex flex-col items-start p-5 text-xs text-gray-500 absolute bottom-0">
            {gnb.map((item, index) => (
              <MenuItem
                key={index}
                label={item.label}
                link={item.link}
                className="py-3"
              />
            ))}
            {!data?.isLoggedIn ? (
              <>
                <MenuItem label="로그인" link="/login" className="py-3" />
                <MenuItem label="회원가입" link="/sign-up" className="py-3" />
              </>
            ) : (
              <li className="py-3">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="hover:text-white"
                >
                  로그아웃
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
