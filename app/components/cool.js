import React from "react";

export default function Cool() {
  return (
    <div>
      /* From Uiverse.io by mobinkakei */
      <div className="relative flex justify-center h-[300px] w-[160px]  border-4 border-black rounded-2xl bg-gray-50">
        <span className="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>

        <span className="absolute -right-2 top-14  border-4 border-black h-7 rounded-md"></span>
        <span className="absolute -right-2 bottom-36  border-4 border-black h-10 rounded-md"></span>
      </div>
      /* From Uiverse.io by Uncannypotato69 */
      <div class="h-[8em] w-[15em] bg-white m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden">
        <div class="h-full w-1/5 bg-[#FDEE00] absolute left-0 bottom-full z-[-1] group-hover:translate-y-full duration-500"></div>
        <div class="h-1/3 w-full bg-[#FF5800] absolute left-[120%] top-0 z-[-1] group-hover:-translate-x-full duration-500"></div>
        <div class="h-1/3 w-full bg-[#007FFF] absolute right-[100%] top-1/3 z-[-1] group-hover:translate-x-full duration-500"></div>
        <div class="h-full w-4/5 bg-[#7CFC00] absolute left-[20%] top-full z-[-1] group-hover:-translate-y-[33.3%] duration-500"></div>

        <button class="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-white duration-100">
          <span class="relative before:h-[0.16em] before:absolute before:w-full before:content-[''] before:bg-[#6C3082] group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">
            More Info
          </span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>

        <h1 class="z-20 font-bold font-Poppin text-[1.4em] group-hover:text-white delay-100 duration-100">
          HEADING
        </h1>
      </div>
      
    </div>
  );
}
