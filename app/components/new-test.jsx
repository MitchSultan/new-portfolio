import React from 'react';

const NewTest = () => {
    return (
        <div className='py-20 w-full min-h-96 flex flex-col items-center justify-center overflow-hidden bg-surface'>
            <h1 className='text-2xl md:text-5xl text-center font-bold text-primary mb-8'>I’ve helped <span className='text-primary bg-azure-blue bg-clip-text text-transparent'>12+</span> local businesses <br /> grow and get more leads.</h1>
            <a href='/testimonial' className='group relative'>
            <button className='btn-primary'>
                View All Stories
            </button></a>
        </div>
    );
};

export default NewTest;