import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Button } from './components/ui/Button';
import { Plus } from 'lucide-react';
import type { Task } from './types';
import styles from './App.module.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <TaskProvider>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <h1 className={styles.appTitle}>TO-DO APP</h1>
          {/* Search bar could go here */}
        </header>

        <main className={styles.main}>
          <TaskList onEditTask={handleEditTask} />
        </main>

        <Button
          className={styles.fab}
          onClick={handleAddTask}
          aria-label="Add Task"
        >
          <Plus size={28} color="white" />
        </Button>

        {isFormOpen && (
          <TaskForm
            initialTask={editingTask}
            onClose={closeForm}
          />
        )}
      </div>
    </TaskProvider>
  );
}

export default App;
