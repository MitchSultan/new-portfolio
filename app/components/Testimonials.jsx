"use client";
import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
    {
        name: "Joshua Mutisya",
        rank: "CEO, ToG",
        link: "https://theotherguyske.org",
        text: "Working with this team was a game-changer for our brand. The attention to detail and creative solutions provided were exactly what we needed to take our business to the next level."
    },
    {
        name: "Felix",
        rank: "Manager, Madgraphix",
        link: "https://madgraphix.co.ke",
        text: "An exceptional experience from start to finish. The website redesign has significantly improved our user engagement and conversion rates. Highly recommended!"
    },
    {
        name: "Nelly",
        rank: "Owner, Nesh Collections",
        link: "https://neshcollections.com",
        text: "I was blown away by the quality of work and the speed of delivery. They truly understood our vision and brought it to life in a way we couldn't have imagined."
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
        rank: "CTO, Reuben Chumba",
        link: "https://reubenchumba.co.ke",
        text: "Technical expertise matched with an eye for design. The custom solution built for us is robust, scalable, and looks fantastic. A true partnership."
    },
    {
        name: "Prof Purity Karimi",
        rank: "CEO, Evolve Sphere Consulting",
        link: "https://evolvesphereconsulting.com",
        text: "The new platform has streamlined our sales process and impressed our clients. It's rare to find such a perfect blend of functionality and aesthetics."
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slideCount = testimonials.length;
    const timerRef = useRef(null);

    const next = () => setCurrentIndex((i) => (i + 1) % slideCount);
    const prev = () => setCurrentIndex((i) => (i - 1 + slideCount) % slideCount);

    useEffect(() => {
        if (isPaused) return;
        timerRef.current = setInterval(next, 5000);
        return () => clearInterval(timerRef.current);
    }, [isPaused]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const leftIndex = (currentIndex - 1 + slideCount) % slideCount;
    const rightIndex = (currentIndex + 1) % slideCount;

    return (
        <section
            className="py-16 bg-white"
            aria-label="Client testimonials"
        >
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-8">
                    <span className="block mb-2 text-sm font-medium text-gray-500">Testimonials</span>
                    <h2 className="text-2xl font-semibold text-gray-900">What Clients Say</h2>
                </div>

                <div
                    className="relative overflow-hidden rounded-lg"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Mobile: single visible card */}
                    <div className="lg:hidden relative h-[260px]">
                        <article
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${currentIndex + 1} of ${slideCount}`}
                            className="absolute inset-0 p-6 sm:p-8"
                        >
                            <div className="h-full flex flex-col justify-between bg-gray-50 border border-gray-100 p-6 rounded-md shadow-sm">
                                <p className="text-base text-gray-700 italic mb-4">“{testimonials[currentIndex].text}”</p>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{testimonials[currentIndex].rank}</p>
                                    <a href={testimonials[currentIndex].link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                                        Visit Website
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Desktop: 3 cards visible */}
                    <div className="hidden lg:flex justify-center gap-6 items-stretch py-6">
                        {[leftIndex, currentIndex, rightIndex].map((idx, pos) => {
                            const t = testimonials[idx];
                            const isCenter = pos === 1;
                            return (
                                <div key={idx} className={`w-1/3 bg-gray-50 p-6 rounded-md border border-gray-100 flex flex-col justify-between transition-transform duration-300 ${isCenter ? 'scale-100 z-10 shadow-md' : 'scale-95 opacity-90'}`}>
                                    <p className="text-base text-gray-700 italic mb-4">“{t.text}”</p>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{t.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1">{t.rank}</p>
                                        <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                                            Visit Website
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Controls (common) */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 shadow-sm border border-gray-100"
                            aria-label="Previous testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                    className={`h-2 w-8 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-300 w-2'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 shadow-sm border border-gray-100"
                            aria-label="Next testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
