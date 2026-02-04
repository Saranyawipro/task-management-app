import React from 'react';
import styles from './TaskFilters.module.css';
import type { TaskStatus } from '../types';

export type FilterType = 'All' | TaskStatus;

interface TaskFiltersProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    counts: {
        All: number;
        Pending: number;
        'In Progress': number;
        Completed: number;
    };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ activeFilter, onFilterChange, counts }) => {
    const filters: FilterType[] = ['All', 'Pending', 'In Progress', 'Completed'];

    return (
        <div className={styles.container}>
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter} <span className={styles.badge}>{counts[filter]}</span>
                </button>
            ))}
        </div>
    );
};
