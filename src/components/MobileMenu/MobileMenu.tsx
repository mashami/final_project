"use client"
const MobileMenu = () => {
  return (
    <div className=" bg-white h-[100%] w-[100%] z-10 absolute top-[88px] right-0 px-8">
      <div className="text-[16px] tracking-[0.01em] text-black flex flex-col list-none space-y-8 py-8">
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href=""> What We Do</a>
        </li>
        <li>
          <a href="">Service</a>
        </li>
        <li>
          <a href="">Project</a>
        </li>
        <li>
          <a href="">Blog</a>
        </li>
        <li>
          <a href="">Contact</a>
        </li>
      </div>
    </div>
  )
}

export default MobileMenu
