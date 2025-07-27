import React from 'react'

export default function About() {
  return (
    <>
      
      <div className='flex justify-between p-3'>
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
       Turning Client's vision into digital reality
      </h2>

      <p className="hidden text-gray-500 md:mt-4 md:block">
       
        I am a web developer with a passion for creating beautiful and functional websites. I have experience in HTML, CSS, JavaScript, and React. I am always learning new technologies and techniques to improve my skills.
      </p>

      <div className="mt-4 md:mt-8">
        <a
          href="wa.me/703666366"
          className="inline-block rounded-sm bg-lavender px-12 py-3 text-sm font-medium text-black transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>

  <img
    alt=""
    src="/images/hero1.png"
    className="max-h-96 w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>
      </div>
    </>
  )
}
