"use client";
import { motion, HTMLMotionProps } from "framer-motion";

export const SlideUp = ({ children, delay = 0, className, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
