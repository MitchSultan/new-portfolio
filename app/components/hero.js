import React from 'react'

export default function hero() {
  return (
    <div className='h-screen w-full flex  items-center justify-center gap-2 '>
      <div className='hero flex flex-col md:flex-row items-center justify-center float-start bg-slate-300 max-w-full h-96 p-4 mx-5'>
        <div>
        <h1 className=' text-center text-5xl font-extrabold capitalize'>Welcome to My Portfolio</h1>
        <p>I'm a passionate developer with a love for coding.</p>
        <div className=' flex gap-2'>
        <button className='btn w-32 h-12 rounded-sm bg-black outline outline-1 outline-white text-white'>Let's Talk</button>
        <button className='btn w-32 h-12 rounded-sm bg-white outline outline-1 outline-black text-black'>See My Work</button>
        </div>
        </div>
        <div className='hero-image hidden md:flex  max-w-96'>
        <img src='/images/hero1.png' alt='Hero Image' className=' max-w-full h-auto ' />
        </div>
      </div>
      
    </div>
  )
}
