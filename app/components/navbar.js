
// 'use client'

// import { useState } from 'react'
// // import { Dialog, DialogPanel } from '@headlessui/react'
// // import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// const navigation = [
//   { name: 'About', href: '/About' },
//   { name: 'Services', href: '/Services' },
//   { name: 'Work', href: '/Work' },
//   { name: 'Case Study', href: '/Cases' },
//   { name: 'Blog', href: '/Blog' },
//   { name: 'Contact', href: '/Contact' },
// ]

// const Navbar = () => {

    
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


//     return (
//         <div className=' mx-2 my-2 rounded-sm'>
//             <header className=" bg-dark  z-50">
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <a href="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Mitch's Portfolio</span>
//               <img
//                 alt=""
//                 src="/globe.svg"
//                 className="h-16 w-auto"
//               />
//             </a>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Open main menu</span>
//               <div aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a key={item.name} href={item.href} className="text-sm/10 font-semibold text-accent">
//                 {item.name}
//               </a>
//             ))}
//           </div>
//           <div className="hidden max-w-32 rounded-md lg:flex lg:flex-1 lg:justify-end lg:bg-red">
//             <a href="https://wa.me/254703666366" className="text-sm/6 font-semibold text-pink">
//               Reach Out <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </nav>
//         {/* <div open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <a href="/" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Pixel Web Solutions</span>
//                 <img
//                 alt=""
//                 src="/web.png"
//                 className="h-16 w-auto"
//               />
//               </a>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               >
//                 <span className="sr-only">Close menu</span>
//                 {/* <XMarkIcon aria-hidden="true" className="h-6 w-6" /> *
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-blue hover:bg-gray-50"
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                   >
//                     First Step
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </header>

//         </div>
//     );
// }

// export default Navbar;

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-gray-800">
              <img src="/Frame 1.svg" className=" max-w-full h-auto"></img>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="/about"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="/donate"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Donate
            </a>
            <a
              href="/contact"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/about"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="/donate"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Donate
            </a>
            <a
              href="/contact"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}