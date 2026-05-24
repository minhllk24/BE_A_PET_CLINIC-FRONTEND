import React from 'react';
import { motion } from 'framer-motion';
import { PetHero } from './PetHero';

export function AuthShell({ children }) {
  return (
    <>
      {/* Full-page sky background to prevent any white gap behind header */}
      <style>{`body { background: #E5F6FD !important; }`}</style>
      <div
        className="min-h-screen pt-[107px] flex flex-col md:grid"
        style={{
          background: '#E5F6FD',
          gridTemplateColumns: '1.618fr 1fr',
        }}
      >
        {/* Left / Top: pet hero */}
        <div className="shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-16 py-3 md:py-0 md:h-[calc(100vh-107px)] h-[22vh] min-h-[120px]">
          <PetHero className="max-h-full md:max-h-[72%] w-auto" />
        </div>

        {/* Right / Bottom: form area — always scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 md:pl-8 md:pr-16 lg:pl-12 lg:pr-20">
          <div className="flex items-start md:items-center justify-center md:justify-start min-h-full py-5 sm:py-6 md:py-10">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[420px] pb-6 sm:pb-8"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
