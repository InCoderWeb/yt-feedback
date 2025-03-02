"use client";
import { motion } from "motion/react";
import React from "react";

export const TextHighlight = ({ children }: { children: React.ReactNode }) => {
  return (
	<>
		<motion.span className="text-primary">{children}</motion.span>
	</>
  )
}
