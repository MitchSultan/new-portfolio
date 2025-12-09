"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Copy, Check } from "lucide-react";

// Utility to generate a random HEX color
const generateRandomHex = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, "0")}`;
};

// Utility to generate a palette with a name
const generatePalette = (id) => {
  const adjectives = ["Neon", "Pastel", "Retro", "Deep", "Vibrant", "Muted", "Dark", "Soft", "Electric", "Oceanic"];
  const nouns = ["Sunset", "Ocean", "Forest", "Dream", "Night", "Sky", "Fire", "Earth", "Mist", "Galaxy"];
  const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  
  return {
    id,
    name,
    colors: Array.from({ length: 5 }, generateRandomHex),
  };
};

const ColorStrip = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div
      className="relative flex-1 group cursor-pointer transition-all duration-300 hover:flex-[1.5]"
      onClick={handleCopy}
    >
      <div 
        className="w-full h-full"
        style={{ backgroundColor: color }}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
        <div className="flex flex-col items-center gap-1">
          {copied ? (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/90 dark:bg-black/80 text-green-600 dark:text-green-400 p-2 rounded-full shadow-lg"
            >
              <Check size={20} strokeWidth={3} />
            </motion.div>
          ) : (
             <span className="font-mono text-white font-bold text-shadow-sm uppercase tracking-wider text-sm md:text-base">
              {color}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const PaletteCard = ({ palette, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100 dark:border-neutral-800"
    >
      <div className="h-48 flex">
        {palette.colors.map((color, i) => (
          <ColorStrip key={i} color={color} />
        ))}
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-display font-medium text-lg text-neutral-800 dark:text-neutral-200">
          {palette.name}
        </h3>
        <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
          <Copy size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function ColorPalettePage() {
  const [palettes, setPalettes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial Generation
  useEffect(() => {
    regenerateAll();
  }, []);

  const regenerateAll = () => {
    setIsGenerating(true);
    // Simulate a small delay for better UX feel
    setTimeout(() => {
      const newPalettes = Array.from({ length: 9 }, (_, i) => generatePalette(Date.now() + i));
      setPalettes(newPalettes);
      setIsGenerating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            Color Palettes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto"
          >
            Discover endless color combinations for your next project. 
            Click any color to copy its hex code.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {palettes.map((palette, index) => (
              <PaletteCard key={palette.id} palette={palette} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button for Mobile or Fixed Bottom Bar */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={regenerateAll}
          disabled={isGenerating}
          className="pointer-events-auto bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium shadow-2xl flex items-center gap-3 backdrop-blur-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-70"
        >
          <RefreshCw size={20} className={isGenerating ? "animate-spin" : ""} />
          <span>Generate New Palettes</span>
        </motion.button>
      </div>

      <Footer />
    </div>
  );
}
