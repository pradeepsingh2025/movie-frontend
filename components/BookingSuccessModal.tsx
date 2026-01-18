'use client';

import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

interface BookingSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BookingSuccessModal({ isOpen, onClose }: BookingSuccessModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative"
                        >
                            {/* Confetti/Decoration Background Effect */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/30 rounded-full blur-[100px]" />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-full hover:bg-white/5 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="p-8 flex flex-col items-center text-center relative z-0">
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                                    className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500 border border-green-500/20"
                                >
                                    <CheckCircle className="w-10 h-10" strokeWidth={1.5} />
                                </motion.div>

                                <h2 className="text-2xl font-semibold text-white mb-2">
                                    Booking Confirmed!
                                </h2>
                                <p className="text-neutral-400 mb-8 max-w-[80%]">
                                    Your seats have been successfully reserved. Go to reservations to view your ticket.
                                </p>

                                {/* Action Button */}
                                <Link
                                    href="/reservations"
                                    className="group relative w-full inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-medium rounded-xl overflow-hidden hover:bg-neutral-200 transition-colors"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Go to Reservations
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>

                                <button
                                    onClick={onClose}
                                    className="mt-4 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
