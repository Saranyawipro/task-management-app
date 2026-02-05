import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Task, TaskStatus } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import styles from './TaskForm.module.css';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { SuccessModal } from './ui/SuccessModal';

interface EditTaskFormProps {
    task: Task;
    onClose: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
    const { updateTask } = useTasks();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState<TaskStatus>(task.status);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        updateTask(task.id, title, description, status);
        setShowSuccess(true);
    };

    const handleSuccessComplete = () => {
        setShowSuccess(false);
        onClose();
    };

    const getStatusDot = (status: TaskStatus) => {
        // Map status to a specific css class or style
        // We will add helper classes in module.css for these colors
        let colorClass = '';
        switch (status) {
            case 'Pending':
                colorClass = styles.dotPending;
                break;
            case 'In Progress':
                colorClass = styles.dotInProgress;
                break;
            case 'Completed':
                colorClass = styles.dotCompleted;
                break;
        }
        return <span className={`${styles.statusDot} ${colorClass}`} />;
    };

    const handleStatusSelect = (newStatus: TaskStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={onClose} className={styles.backBtn}>
                        <ArrowLeft size={24} color="white" />
                    </button>
                    <h2 className={styles.heading}>Edit Task</h2>
                    <div style={{ width: 24 }} /> {/* Spacer */}
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={styles.inputControl}
                    />

                    <div className={styles.textAreaGroup}>
                        <textarea
                            className={styles.textarea}
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className={styles.selectGroup}>
                        <div
                            className={`${styles.customSelect} ${isDropdownOpen ? styles.open : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className={styles.selectedValue}>
                                {getStatusDot(status)}
                                <span>{status}</span>
                            </div>
                            {isDropdownOpen ? <ChevronUp size={16} color="#6B7280" /> : <ChevronDown size={16} color="#6B7280" />}

                            {isDropdownOpen && (
                                <div className={styles.dropdownOptions}>
                                    <div
                                        className={styles.optionItem}
                                        onClick={(e) => { e.stopPropagation(); handleStatusSelect('In Progress'); }}
                                    >
                                        {getStatusDot('In Progress')}
                                        <span>In Progress</span>
                                    </div>
                                    <div
                                        className={styles.optionItem}
                                        onClick={(e) => { e.stopPropagation(); handleStatusSelect('Pending'); }}
                                    >
                                        {getStatusDot('Pending')}
                                        <span>Pending</span>
                                    </div>
                                    <div
                                        className={styles.optionItem}
                                        onClick={(e) => { e.stopPropagation(); handleStatusSelect('Completed'); }}
                                    >
                                        {getStatusDot('Completed')}
                                        <span>Completed</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim()}>
                            Update
                        </Button>
                    </div>
                </form>

                <SuccessModal
                    isOpen={showSuccess}
                    message="Task updated successfully!"
                    onClose={handleSuccessComplete}
                />
            </div>
        </div>
    );
};
