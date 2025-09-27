"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const leaves: string[] = ["🍃", "🍂", "🍁", "🌿", "🍀", "🌱", "🌴", "🌵"];

const getRandomLeaf = (): string =>
  leaves[Math.floor(Math.random() * leaves.length)];

export default function LeafGrid(): JSX.Element {
  const [grid, setGrid] = useState<string[]>(
    Array(9)
      .fill(null)
      .map(() => getRandomLeaf()) // 3x3 grid
  );

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = grid.map((_, index) => {
      const changeLeaf = () => {
        setGrid((prev) =>
          prev.map((leaf, i) => (i === index ? getRandomLeaf() : leaf))
        );

        // schedule next change with a random interval (2–5s)
        const nextTimeout = setTimeout(changeLeaf, 2000 + Math.random() * 3000);
        timeouts[index] = nextTimeout;
      };

      return setTimeout(changeLeaf, 2000 + Math.random() * 3000);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-6 text-5xl text-center">
      {grid.map((leaf, index) => (
        <div
          key={index}
          className="p-6 bg-green-100 rounded-2xl shadow-lg flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={leaf} // triggers animation on change
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5 }}
            >
              {leaf}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
