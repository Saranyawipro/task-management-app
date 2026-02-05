import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Task } from '../types';
import { useTasks } from '../context/TaskContext';
import styles from './TaskItem.module.css';
import { Pencil, Trash2, Check, RotateCcw } from 'lucide-react';
import { DeleteConfirmModal } from './ui/DeleteConfirmModal';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    const { deleteTask, updateTask } = useTasks();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isCompleted = task.status === 'Completed';

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getFullYear();
        return `${weekday} ${day}, ${month} ${year}`;
    };

    const getInitial = () => {
        return task.title.charAt(0).toUpperCase();
    };

    const getStatusColor = () => {
        switch (task.status) {
            case 'Completed':
                return '#2ECC71';
            case 'In Progress':
                return '#F5A623';
            default:
                return '#888888';
        }
    };

    const handleDelete = () => {
        deleteTask(task.id);
        setIsDeleteModalOpen(false);
    };

    const toggleComplete = () => {
        updateTask(
            task.id,
            task.title,
            task.description,
            isCompleted ? 'Pending' : 'Completed'
        );
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`${styles.card} ${isCompleted ? styles.completed : ''}`}
            >
                <div className={styles.avatar}>
                    {getInitial()}
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{task.title}</h3>
                        <div className={styles.statusBadge}>
                            <span className={styles.statusDot} style={{ backgroundColor: getStatusColor() }}></span>
                            <span className={styles.statusText}>{task.status}</span>
                        </div>
                    </div>
                    <p className={styles.description}>{task.description}</p>
                    <span className={styles.date}>{formatDate(task.createdAt)}</span>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={toggleComplete}
                        className={`${styles.actionBtn} ${styles.checkBtn}`}
                        aria-label={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                    >
                        {isCompleted ? (
                            <RotateCcw size={16} color="#888888" />
                        ) : (
                            <Check size={16} color="#2ECC71" />
                        )}
                    </button>
                    <button onClick={() => onEdit(task)} className={styles.actionBtn} aria-label="Edit">
                        <Pencil size={16} color="#004AAD" />
                    </button>
                    <button onClick={() => setIsDeleteModalOpen(true)} className={styles.actionBtn} aria-label="Delete">
                        <Trash2 size={16} color="#FF4D4F" />
                    </button>
                </div>
            </motion.div>

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title={`Delete "${task.title}"?`}
            />
        </>
    );
};
