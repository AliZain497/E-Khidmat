import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function AnimatedSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="your-section-class"
    >
      {/* Your section content */}
    </motion.div>
  );
}
