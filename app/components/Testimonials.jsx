
"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        name: "Joshua Mutisya",
        rank: "CEO, ToG",
        link: "https://theotherguyske.org",
        text: "Working with this team was a game-changer for our brand. The attention to detail and creative solutions provided were exactly what we needed to take our business to the next level."
    },
    {
        name: "Tina",
        rank: "Founder, Luxury by Tina",
        link: "https://luxurybytina.com",
        text: "An exceptional experience from start to finish. The website redesign has significantly improved our user engagement and conversion rates. Highly recommended!"
    },
    {
        name: "Sam",
        rank: "Founder, CanvasPile",
        link: "https://canvaspile.com",
        text: "I was blown away by the quality of work and the speed of delivery. They truly understood our vision and brought it to life in a way we couldn't have imagined."
    },
    {
        name: "Reuben",
        rank: "CTO, ",
        link: "https://innovatex.example.com",
        text: "Technical expertise matched with an eye for design. The custom solution built for us is robust, scalable, and looks fantastic. A true partnership."
    },
    {
        name: "Emily Thompson",
        rank: "VP of Sales, Aura",
        link: "https://aura.example.com",
        text: "The new platform has streamlined our sales process and impressed our clients. It's rare to find such a perfect blend of functionality and aesthetics."
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, [currentIndex]);


    const getVisibleTestimonials = () => {
        // Logic to handle wrapping for 3 items
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return visible;
    };

    const visibleTestimonialsDesktop = getVisibleTestimonials();
    const visibleTestimonialMobile = testimonials[currentIndex];

    return (
        <section className="py-20 bg-white dark:bg-dark overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="block mb-4 text-lg font-semibold text-primary-600 dark:text-primary-400">
                        Testimonials
                    </span>
                    <h2 className="text-3xl font-bold font-display text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        What Clients Say
                    </h2>
                </div>

                {/* Desktop View (3 items) */}
                <div className="hidden lg:flex justify-center gap-8" ref={containerRef}>
                    {visibleTestimonialsDesktop.map((item, index) => (
                        <div
                            key={`${currentIndex}-${index}`}
                            ref={el => cardsRef.current[index] = el}
                            className="w-1/3 bg-gray-50 dark:bg-dark-2 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between"
                        >
                            <p className="text-base text-body-color dark:text-gray-300 italic mb-6">"{item.text}"</p>
                            <div>
                                <h4 className="text-lg font-bold text-dark dark:text-white">{item.name}</h4>
                                <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">{item.rank}</p>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View (1 item with arrows) */}
                <div className="lg:hidden relative flex items-center justify-center">

                    <button
                        onClick={prevSlide}
                        className="absolute left-0 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-dark dark:text-white transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div
                        key={currentIndex}
                        className="w-full md:w-2/3 bg-gray-50 dark:bg-dark-2 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between mx-12 min-h-[300px]"
                    >
                        <p className="text-base text-body-color dark:text-gray-300 italic mb-6">"{visibleTestimonialMobile.text}"</p>
                        <div>
                            <h4 className="text-lg font-bold text-dark dark:text-white">{visibleTestimonialMobile.name}</h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">{visibleTestimonialMobile.rank}</p>
                            <a href={visibleTestimonialMobile.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                                Visit Website
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-dark dark:text-white transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
