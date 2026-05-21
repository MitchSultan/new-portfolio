import React from "react";

const About = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 sm:pt-42 sm:pb-12 lg:pt-[120px] lg:pb-[90px] bg-surface p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-1/2">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 hidden lg:block">
                  <div className="h-[500px] py-3 sm:py-4">
                    <video src="/images/Scene.webm" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                 <div className="w-full px-3 sm:px-4 xl:w-1/2 lg:hidden">
                  <div className="relative z-10 my-4">
                  <video src="/images/truy.webm" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
                  </div>
                </div> 
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-sm font-thin font-mono ">
                  What about me?
                </span>
                <h2 className="mb-5 text-3xl font-bold text-primary sm:text-[40px]/[48px]">
                I Make businesses a home online.
                </h2>
                <p className="mb-5 text-base text-text">
                 I have a background in Telecommunications Engineering with a passion for aviation.
                </p>
                <p className="mb-8 text-base font-light text-text">
                  I believe websites are not just an expense for you but could be an asset. I aim to make your website the best it could be and provide value.
                </p>
                <a
                  href="https://wa.me/254703666366"
                  className="btn-primary inline-flex"
                >
                  Lets Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
