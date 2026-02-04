import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import type { Task, TaskStatus } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import styles from './TaskForm.module.css';
import { ArrowLeft } from 'lucide-react';

interface TaskFormProps {
    initialTask?: Task;
    onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onClose }) => {
    const { addTask, updateTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('Pending');

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            setStatus(initialTask.status);
        }
    }, [initialTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (initialTask) {
            updateTask(initialTask.id, title, description, status);
        } else {
            addTask(title, description);
        }
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={onClose} className={styles.backBtn}>
                        <ArrowLeft size={24} color="var(--primary-blue)" />
                    </button>
                    <h2 className={styles.heading}>{initialTask ? 'Edit Task' : 'Add Task'}</h2>
                    <div style={{ width: 24 }} /> {/* Spacer */}
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <div className={styles.textAreaGroup}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {initialTask && (
                        <div className={styles.selectGroup}>
                            <label className={styles.label}>Status</label>
                            <select
                                className={styles.select}
                                value={status}
                                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <Button type="button" variant="secondary" onClick={onClose} fullWidth>
                            Cancel
                        </Button>
                        <Button type="submit" fullWidth disabled={!title.trim()}>
                            {initialTask ? 'Save' : 'Add'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
