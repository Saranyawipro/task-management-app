import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Task, TaskStatus } from '../types';

interface TaskContextType {
    tasks: Task[];
    addTask: (title: string, description: string) => void;
    updateTask: (id: string, title: string, description: string, status: TaskStatus) => void;
    deleteTask: (id: string) => void;
    toggleStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to parse tasks from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            status: 'Pending',
            createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const updateTask = (id: string, title: string, description: string, status: TaskStatus) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title, description, status } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleStatus = (id: string) => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id !== id) return task;
                // Simple toggle logic, though typically we might want to cycle or just set explicitly
                // Logic: Pending -> In Progress -> Completed -> Pending? Or just Checkbox style?
                // Figma usually has checkboxes for completion. 
                // But requirement says "Mark Task as Completed".
                // Let's assume binary toggle for checkbox, but we support 3 states.
                // If clicking a checkbox, usually Completed <-> Pending/In Progress.
                // I will implement explicit status change in Edit, but maybe a simple "Complete" action.
                const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
                return { ...task, status: newStatus };
            })
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleStatus }}>
            {children}
        </TaskContext.Provider>
    );
};
