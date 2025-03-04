"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu, GiLogging } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  //로그인했을 때
  const authCheck = async () => {
    const response = await fetch("http://localhost:3000/api/users/auth-check", {
      credentials: "include",
    });

    const result = await response.json();
    return result.data;
  };
  const { data } = useQuery({
    queryKey: ["get"],
    queryFn: authCheck,
  });

  //로그아웃했을 때
  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      queryClient.setQueryData(["get"], { isLoggedIn: false });
    }
  };
  return (
    <nav>
      <ul
        id="menu2"
        className=" hidden md:flex items-center justify-between text-xs text-gray-400"
      >
        <li className="pr-5">
          <Link href={"/newPost"} className="hover:text-gray-700">
            게시글등록
          </Link>
        </li>
        <li className="pr-5 relative group">
          <Link href={"/newProduct"} className="hover:text-gray-700">
            제품등록
          </Link>
        </li>

        <li className="pr-5">
          <a href="#">마이페이지</a>
        </li>
        <li className="pr-5">
          <a href="#">장바구니</a>
        </li>
        {!data?.isLoggedIn ? (
          <>
            <li className="pr-5">
              <Link href={"/login"}>로그인</Link>
            </li>
            <li className="pr-5">
              <Link href={"/sign-up"}>회원가입</Link>
            </li>
          </>
        ) : (
          <li className="pr-5">
            <Link
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              로그아웃
            </Link>
          </li>
        )}
      </ul>
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu className="pr-4" size={55} />
        {/* Sliding Menu */}
        <div
          className={`fixed top-0 right-0 w-[140px] h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-start p-5">
            <li className="py-3 font-bold text-xl">
              <a
                href="#"
                className="hover:border-b-4 hover:border-black duration-200"
              >
                BEST
              </a>
            </li>
            <li className="py-3">
              <a href="#">남성</a>
            </li>
            <li className="py-3">
              <a href="#">여성</a>
            </li>
            <li className="py-3">
              <a href="#">신발</a>
            </li>
            <li className="py-2">
              <a href="#">가방 & 용품</a>
            </li>
            <li className="py-2">
              <a href="#">게시글</a>
            </li>
          </ul>

          <ul className="flex flex-col  items-start p-5 text-xs text-gray-500 absolute bottom-0">
            <li className="pr-5">
              <Link href={"/newPost"} className="hover:text-gray-700">
                게시글등록
              </Link>
            </li>
            <li className="pr-5 relative group">
              <Link href={"/newProduct"} className="hover:text-gray-700">
                제품등록
              </Link>
            </li>
            <li className="py-3">
              <a href="#">마이페이지</a>
            </li>
            <li className="py-3">
              <a href="#">장바구니</a>
            </li>
            {!data?.isLoggedIn ? (
              <>
                <li className="py-3">
                  <Link href={"/login"}>로그인</Link>
                </li>
                <li className="py-3">
                  <Link href={"/sign-up"}>회원가입</Link>
                </li>
              </>
            ) : (
              <li className="py-3">
                <Link
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  로그아웃
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
