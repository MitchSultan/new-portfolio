'use client';
import {useState, useEffect} from 'react';
import Head from 'next/head';

export default function page() {

    const Birthday = new Date('2025-06-15T00:00:00');

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +Birthday - +new Date();

            if (difference <= 0) {
                setIsExpired(true);
                return{
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0};
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));    
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return {days, hours, minutes, seconds};
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        }, []);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

        
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 via-blue-500 to-cyan-400 text-white">
      <Head>
        <title>Countdown to June 15, 2025</title>
        <meta name="description" content="Countdown timer to June 15, 2025" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          {isExpired ? 
            "The date has arrived!" : 
            "Countdown to June 15, 2025"}
        </h1>
        
        {isExpired ? (
          <p className="text-2xl">The countdown is complete!</p>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                <span className="text-5xl md:text-7xl font-bold">{formatTime(timeLeft.days)}</span>
              </div>
              <span className="text-xl mt-2">Days</span>
            </div>
            
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                <span className="text-5xl md:text-7xl font-bold">{formatTime(timeLeft.hours)}</span>
              </div>
              <span className="text-xl mt-2">Hours</span>
            </div>
            
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                <span className="text-5xl md:text-7xl font-bold">{formatTime(timeLeft.minutes)}</span>
              </div>
              <span className="text-xl mt-2">Minutes</span>
            </div>
            
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                <span className="text-5xl md:text-7xl font-bold">{formatTime(timeLeft.seconds)}</span>
              </div>
              <span className="text-xl mt-2">Seconds</span>
            </div>
          </div>
        )}
        
        <p className="mt-12 text-xl">
          {isExpired ? 
            "Thank you for waiting!" : 
            "The countdown is in progress..."}
        </p>
      </main>

      <footer className="w-full py-4 text-center border-t border-white border-opacity-20">
        <p>Make something happen</p>
      </footer>
    </div>
  )
}
