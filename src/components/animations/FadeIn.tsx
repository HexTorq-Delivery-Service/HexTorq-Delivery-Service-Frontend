"use client";
import { motion, HTMLMotionProps } from "framer-motion";

export const FadeIn = ({ children, delay = 0, className, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
