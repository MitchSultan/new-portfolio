import React from 'react';

const Experiences = [

]

export default function Exper() {
  return (
    <div className=' p-3'>
       <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="flex flex-col justify-between items-left md:flex-row md:items-center">
      <div>
      <h2 className="text-3xl font-extrabold capitalize  md:text-5xl">Some of my work</h2>

      <p className="mt-4 max-w-md ">
        I have created a variety of projects, including websites, applications, and more. Here are some of my favorites.
        <br />
      </p>
      </div>
      <div>
      <a href='/playground'><button className='btn w-32 h-12 rounded-sm  outline outline-1 outline-lavender '>All Projects</button></a>
      </div>
    </header>

    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./evol.png" alt=""
            className="h-[350px] w-full object-cover transition group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative  pt-3">
            <a href='https://evolvesphereconsulting.com' target='_blank'>
            <h3 className="text-xs  group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider  font-extrabold"> Evolve </span>
              <span className="tracking-wider  font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./just.png"
            alt=""
            className="h-[350px] w-full object-cover transition group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative  pt-3">
            <a href='https://justatherealtor.co.ke' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider  font-extrabold"> Justa </span>
              <span className="tracking-wider  font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./etog.png"alt=""
            className="h-[350px] w-full object-cover transition group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative  pt-3">
            <a href='https://theotherguyskenya.org' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider  font-extrabold"> T.O.G </span>
              <span className="tracking-wider  font-thin"> Details </span>
            </p>
          </div>
        </a>
      </li>

      <li>
        <a href="#" className="group block overflow-hidden">
          <img
            src="./f1r.png"
            alt=""
            className="h-[350px] w-full object-cover transition group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative  pt-3">
            <a href='https://f1rstlap.com' target='_blank'>
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              visit
            </h3>
            </a>

            <p className="mt-2 flex justify-between">

              <span className="tracking-wider  font-extrabold"> F1rstlap  </span>
              <span className="tracking-wider  font-thin"> Details </span>
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
