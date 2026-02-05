import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskFilters, type FilterType } from './TaskFilters';
import type { Task } from '../types';
import styles from './TaskList.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TaskListProps {
    onEditTask: (task: Task) => void;
    searchQuery: string;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask, searchQuery }) => {
    const { tasks } = useTasks();
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    // Filter tasks by search query
    const filteredTasks = tasks.filter(task => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query);
    });

    // Group tasks
    const pendingTasks = filteredTasks.filter(t => t.status === 'Pending');
    const inProgressTasks = filteredTasks.filter(t => t.status === 'In Progress');
    const completedTasks = filteredTasks.filter(t => t.status === 'Completed');

    const counts = {
        All: filteredTasks.length,
        Pending: pendingTasks.length,
        'In Progress': inProgressTasks.length,
        Completed: completedTasks.length
    };

    const shouldShow = (section: FilterType) => {
        if (activeFilter === 'All') return true;
        return activeFilter === section;
    };

    return (
        <div className={styles.listContainer}>
            <TaskFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
            />

            {shouldShow('In Progress') && (
                <Accordion title="In Progress" count={inProgressTasks.length} defaultOpen={true}>
                    <div className={styles.sectionContent}>
                        <AnimatePresence mode="popLayout">
                            {inProgressTasks.length > 0 ? (
                                inProgressTasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        className={styles.itemWrapper}
                                    >
                                        <TaskItem task={task} onEdit={onEditTask} />
                                    </motion.div>
                                ))
                            ) : (activeFilter === 'In Progress' && <p className={styles.emptyText}>No tasks in progress.</p>)}
                        </AnimatePresence>
                    </div>
                </Accordion>
            )}

            {shouldShow('Pending') && (
                <Accordion title="Pending" count={pendingTasks.length} defaultOpen={true}>
                    <div className={styles.sectionContent}>
                        <AnimatePresence mode="popLayout">
                            {pendingTasks.length > 0 ? (
                                pendingTasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        className={styles.itemWrapper}
                                    >
                                        <TaskItem task={task} onEdit={onEditTask} />
                                    </motion.div>
                                ))
                            ) : (activeFilter === 'Pending' && <p className={styles.emptyText}>No pending tasks.</p>)}
                        </AnimatePresence>
                    </div>
                </Accordion>
            )}

            {shouldShow('Completed') && (
                <Accordion title="Completed" count={completedTasks.length} defaultOpen={activeFilter === 'Completed' ? true : false}>
                    <div className={styles.sectionContent}>
                        <AnimatePresence mode="popLayout">
                            {completedTasks.length > 0 ? (
                                completedTasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        className={styles.itemWrapper}
                                    >
                                        <TaskItem task={task} onEdit={onEditTask} />
                                    </motion.div>
                                ))
                            ) : (activeFilter === 'Completed' && <p className={styles.emptyText}>No completed tasks.</p>)}
                        </AnimatePresence>
                    </div>
                </Accordion>
            )}

            {activeFilter === 'All' && tasks.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No tasks yet. Click + to add one!</p>
                </div>
            )}
        </div>
    );
};

interface AccordionProps {
    title: string;
    count: number;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, count, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.sectionTitle}>{title} <span className={styles.count}>({count})</span></span>
                {isOpen ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
            </button>

            {isOpen && (
                <div className={styles.content}>
                    {children}
                </div>
            )}
        </div>
    );
};
