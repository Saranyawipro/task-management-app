import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import styles from './TaskForm.module.css';
import { ArrowLeft } from 'lucide-react';
import { SuccessModal } from './ui/SuccessModal';

interface AddTaskFormProps {
    onClose: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose }) => {
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTask(title, description);
        setShowSuccess(true);
    };

    const handleSuccessComplete = () => {
        setShowSuccess(false);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={onClose} className={styles.backBtn}>
                        <ArrowLeft size={24} color="white" />
                    </button>
                    <h2 className={styles.heading}>Add Task</h2>
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

                    <div className={styles.actions}>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim()}>
                            ADD
                        </Button>
                    </div>
                </form>

                <SuccessModal
                    isOpen={showSuccess}
                    message="Task added successfully!"
                    onClose={handleSuccessComplete}
                />
            </div>
        </div>
    );
};
