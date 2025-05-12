import React from 'react';

const Experiences = [

]

export default function Exper() {
  return (
    <div className=' p-3'>
       <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Some of my work</h2>

      <p className="mt-4 max-w-md text-gray-500">
        I have created a variety of projects, including websites, applications, and more. Here are some of my favorites.
        <br />
      </p>
    </header>

    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./evol.png" alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative bg-white pt-3">
            <a href='https://evolvesphereconsulting.com' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider text-gray-900 font-extrabold"> Evolve </span>
              <span className="tracking-wider text-gray-500 font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./images/clear2.jpeg"
            alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative bg-white pt-3">
            <a href='https://pixelwebsolution.com' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider text-gray-900 font-extrabold"> Pixel </span>
              <span className="tracking-wider text-gray-500 font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./etog.png"alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative bg-white pt-3">
            <a href='https://theotherguyskenya.org' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider text-gray-900 font-extrabold"> T.O.G </span>
              <span className="tracking-wider text-gray-500 font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./images/clear3.jpeg"
            alt=""
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative bg-white pt-3">
            <a href='https://f1rstlap.com' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider text-gray-900 font-extrabold"> F1rstlap  </span>
              <span className="tracking-wider text-gray-500 font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</section>
    </div>
  )
}
