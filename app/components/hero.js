import React from 'react'

export default function Hero() {
  return (
    <div className=' flex flex-col p-3' >
    {/* <div>
        <h1 className='text-3xl lg:text-6xl text-light'>I'm <span className=' font-bold text-primary'>Mitch Sultan</span>  <br></br> a full-stack web developer</h1>
    <p> Three years in the field and a strong foundation in telecommunications engineering, spanning industries such as incorporation, insurance, banking, and education.</p>
    </div>
    <div className=' flex flex-row gap-4'>
        <button className=' bg-dark text-light h-12 w-32 rounded-md hover:shadow-md'>About Me</button>
        <button className=' bg-dark text-light  h-12 w-32 rounded-md shadow-sm'><a href='/About'>My Work</a></button>
    </div> */}
<div className="flex flex-col items-start gap-4">
  <img
    src="/images/hero.png"
    alt=" hero image of Mitch"
    className="size-40 rounded-lg object-cover"
  />

  <div>
    <h3 className="text-lg/tight lg:text-6xl font-medium text-gray-900">I'm <span>Mitch Sultan</span></h3>

    <p className="mt-2 text-gray-700">
     
    Full-Stack Web Developer with three years in the field and a strong foundation in telecommunications engineering, spanning industries such as incorporation, insurance, banking, and education.
    </p>
  </div>
</div>
    </div>
  )
}
