import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    autoCloseMs?: number;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    message,
    onClose,
    autoCloseMs = 1500
}) => {
    useEffect(() => {
        if (isOpen && autoCloseMs > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseMs);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoCloseMs, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.backdrop}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className={styles.modal}
                    >
                        <motion.div
                            className={styles.iconWrapper}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.1
                            }}
                        >
                            <motion.div
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Check size={40} color="#10B981" strokeWidth={3} />
                            </motion.div>
                        </motion.div>

                        <h3 className={styles.title}>Success!</h3>
                        <p className={styles.message}>{message}</p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
