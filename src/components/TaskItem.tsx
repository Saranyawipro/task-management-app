import React from 'react';
import type { Task } from '../types';
import { useTasks } from '../context/TaskContext';
import styles from './TaskItem.module.css';
import { Pencil, Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    const { deleteTask, toggleStatus } = useTasks();

    const getStatusIcon = () => {
        switch (task.status) {
            case 'Completed':
                return <CheckCircle2 size={24} color="var(--status-completed)" />;
            case 'In Progress':
                return <Clock size={24} color="var(--status-progress)" />;
            default:
                return <Circle size={24} color="var(--status-pending)" />;
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.statusIcon} onClick={() => toggleStatus(task.id)}>
                {getStatusIcon()}
            </div>

            <div className={styles.content}>
                <h3 className={`${styles.title} ${task.status === 'Completed' ? styles.completedTitle : ''}`}>
                    {task.title}
                </h3>
                <p className={styles.description}>{task.description}</p>
                <span className={styles.date}>{formatDate(task.createdAt)}</span>
            </div>

            <div className={styles.actions}>
                <button onClick={() => onEdit(task)} className={styles.actionBtn} aria-label="Edit">
                    <Pencil size={18} color="var(--primary-blue)" />
                </button>
                <button onClick={() => deleteTask(task.id)} className={styles.actionBtn} aria-label="Delete">
                    <Trash2 size={18} color="#FF4D4F" />
                </button>
            </div>
        </div>
    );
};
