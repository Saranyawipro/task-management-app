import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import styles from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onCancel,
    onConfirm,
    title = "Delete Task?"
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.backdrop}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={styles.modal}
                    >
                        <motion.div
                            className={styles.iconWrapper}
                            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                        >
                            <Trash2 size={32} color="#FF4D4F" />
                        </motion.div>

                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.message}>Are you sure you want to delete this task? This action cannot be undone.</p>

                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={onCancel}>
                                No, Keep it
                            </button>
                            <button className={styles.deleteBtn} onClick={onConfirm}>
                                Yes, Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
