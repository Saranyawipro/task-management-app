import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskFilters, type FilterType } from './TaskFilters';
import type { Task } from '../types';
import styles from './TaskList.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TaskListProps {
    onEditTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
    const { tasks } = useTasks();
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    // Group tasks
    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    const counts = {
        All: tasks.length,
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
                    {inProgressTasks.length > 0 ? (
                        inProgressTasks.map(task => (
                            <div key={task.id} className={styles.itemWrapper}>
                                <TaskItem task={task} onEdit={onEditTask} />
                            </div>
                        ))
                    ) : (activeFilter === 'In Progress' && <p className={styles.emptyText}>No tasks in progress.</p>)}
                </Accordion>
            )}

            {shouldShow('Pending') && (
                <Accordion title="Pending" count={pendingTasks.length} defaultOpen={true}>
                    {pendingTasks.length > 0 ? (
                        pendingTasks.map(task => (
                            <div key={task.id} className={styles.itemWrapper}>
                                <TaskItem task={task} onEdit={onEditTask} />
                            </div>
                        ))
                    ) : (activeFilter === 'Pending' && <p className={styles.emptyText}>No pending tasks.</p>)}
                </Accordion>
            )}

            {shouldShow('Completed') && (
                <Accordion title="Completed" count={completedTasks.length} defaultOpen={activeFilter === 'Completed' ? true : false}>
                    {completedTasks.length > 0 ? (
                        completedTasks.map(task => (
                            <div key={task.id} className={styles.itemWrapper}>
                                <TaskItem task={task} onEdit={onEditTask} />
                            </div>
                        ))
                    ) : (activeFilter === 'Completed' && <p className={styles.emptyText}>No completed tasks.</p>)}
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

    // Update state if defaultOpen changes (e.g. filter switch)? 
    // Not strictly necessary as key usually resets or we just rely on component state.
    // Actually, if we want switching filters to auto-open, we might need a useEffect or key on Accordion.
    // Let's add key={title + activeFilter} in parent? No, keeping state is fine.

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
