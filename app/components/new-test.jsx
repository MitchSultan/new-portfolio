import React from 'react';

const NewTest = () => {
    return (
        <div className='py-20  w-full min-h-96 flex flex-col items-center justify-center overflow-hidden'>
            <h1 className='text-3xl md:text-5xl text-center font-bold text-dark dark:text-white'>I’ve helped <span className='text-primary-600 dark:text-primary-400'>32+</span> SMBs <br /> grow and manage their teams.</h1>

            <button className='inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-lavender hover:bg-opacity-90'>
                View All Stories
            </button>
        </div>
    );
};

export default NewTest;