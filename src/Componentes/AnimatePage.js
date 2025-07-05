// src/Animaciones/AnimatedPage.jsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ width: '100%' }} // Asegura que ocupa el ancho completo
    >
      {children}
    </motion.div>
  );
}
