import React from 'react'

export default function About() {
  return (
    <>
      
      <div className='flex justify-between p-3'>
        <section className="overflow-hidden  sm:grid sm:grid-cols-2 sm:items-center">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold  md:text-3xl">
       Turning Client's vision into digital reality
      </h2>

      <p className="hidden  md:mt-4 md:block">
       
        I am a web developer with a passion for creating beautiful and functional websites. I have experience in HTML, CSS, JavaScript, and React. I am always learning new technologies and techniques to improve my skills.
      </p>

      
    </div>
  </div>

  <img
    alt=""
    src="/images/hero1.png"
    className="max-h-96 w-full object-contain sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>
      </div>
    </>
  )
}
