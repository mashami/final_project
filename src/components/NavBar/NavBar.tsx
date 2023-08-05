"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MobileMenu from "../MobileMenu/MobileMenu"
import { Button } from "../ui/button"
import style from "./NavBar.module.scss"

const NavBar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const router = useRouter()
  const menuClicked = () => {
    setIsMenuClicked(!isMenuClicked)
  }
  return (
    <nav
      className={`${style.nav}  bg-transparent container flex justify-between items-center py-10 lg:mr-20 mx-auto relative -z-0`}
    >
      <svg
        className="absolute top-12 -right-16 -z-10"
        width={406}
        height={154}
        viewBox="0 0 406 154"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="402.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="360.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="318.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="24.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="24.5" r="3.5" fill="#FFF5DB" />
        <circle cx="255.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="45.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="45.5" r="3.5" fill="#FFF5DB" />
        <circle cx="255.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="318.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="402.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="87.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="87.5" r="3.5" fill="##FFF5DB" />
        <circle cx="276.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="402.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="150.5" r="3.5" fill="#F4F4F4" />
      </svg>
      <svg
        className="absolute top-0 -left-16 -z-10"
        width={150}
        height={125}
        viewBox="0 0 150 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="64.1794"
          cy="35.5584"
          rx="4.67939"
          ry="4.40413"
          fill="#FFF5DB"
        />
        <ellipse
          cx="111.823"
          cy="92.5975"
          rx="4.67939"
          ry="4.40413"
          fill="#6944D5"
        />
        <path
          d="M58.1619 75.0358C58.1619 77.8637 55.7588 80.2657 52.6567 80.2657C49.5546 80.2657 47.1515 77.8637 47.1515 75.0358C47.1515 72.2078 49.5546 69.8058 52.6567 69.8058C55.7588 69.8058 58.1619 72.2078 58.1619 75.0358Z"
          stroke="#6944D5"
          strokeWidth="3.3031"
        />
        <rect
          x="-1.5"
          y="12.8486"
          width="14.6581"
          height="14.6581"
          transform="rotate(-60 -1.5 12.8486)"
          fill="#D9CCFF"
        />
        <rect
          x="135.756"
          y="56.5752"
          width="8.27375"
          height="8.27375"
          transform="rotate(-60 135.756 56.5752)"
          stroke="#D9CCFF"
          strokeWidth="3.3031"
        />
        <path
          d="M60.5835 107.154L68.4501 120.367H52.717L60.5835 107.154Z"
          fill="#D9CCFF"
        />
        <path
          d="M126.462 14.5851L119.734 28.672L110.898 15.8014L126.462 14.5851Z"
          fill="#9A77FF"
        />
      </svg>

      <div>
        <h1 className="text-gray-500 font-light font-serif">iHUZO</h1>
      </div>
      <div>
        {/* <button
          onClick={menuClicked}
          className={`${isMenuClicked ? "hidden" : ""}`}
        >
          <svg
            className="lg:hidden block  "
            width={30}
            height={30}
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </button>

        <button
          onClick={menuClicked}
          className={`${!isMenuClicked ? "hidden" : ""}`}
        >
          <svg
            fill="black"
            width={30}
            height={30}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
          </svg>
        </button> */}
        <ul>
          <li className="hover:text-purple-300 focus:text-purple-300">
            <a href="/Home">Home</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="/"> What We Do</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="/service">Service</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="">Developer</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="/apis">API</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="">Contact</a>
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        <Button
          text="Sign up"
          onClick={() => router.push("/")}
          className="rounded-lg"
        />
        <Button
          text="Sign in"
          onClick={() => router.push("/signin")}
          className="rounded-lg"
        />
      </div>
      {isMenuClicked ? <MobileMenu /> : ""}
    </nav>
  )
}

export default NavBar
