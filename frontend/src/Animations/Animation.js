// src/components/PageWrapper.js
import { motion } from "framer-motion";

export default function PageWrapper({ children, variant }) {
  // Import animation variants
  const variants = {
    fadeInUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 1, ease: 'easeInOut' },
    },
    simpleFade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1, ease: 'easeOut' },
    },
    slideFromRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 1, ease: [0.45, 0, 0.55, 1] },
    }
  };

  // fallback to fadeInUp if variant prop not provided or invalid
  const animation = variants[variant] || variants.fadeInUp;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animation}
      transition={animation.transition}
      style={{ height: "100%" }} // optional, helps with layout
    >
      {children}
    </motion.div>
  );
}
