import React from 'react';
import { motion } from 'framer-motion';
import petHero from '../assets/images/pet-hero.png';

/**
 * Shared layout element that animates between homepage hero (right side)
 * and auth pages (left side). The image background is pre-matched to the
 * page's sky color so it blends seamlessly during the transition.
 */
export function PetHero({ className = '' }) {
  return (
    <motion.img
      layoutId="petiny-pet-hero"
      src={petHero}
      alt="Petiny pets"
      className={`select-none pointer-events-none object-contain ${className}`}
      draggable={false}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }}
    />
  );
}
