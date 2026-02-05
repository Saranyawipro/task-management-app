import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { AddTaskForm } from './components/AddTaskForm';
import { EditTaskForm } from './components/EditTaskForm';
import { Button } from './components/ui/Button';
import { Plus, Search } from 'lucide-react';
import type { Task } from './types';
import styles from './App.module.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

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
        {!isFormOpen ? (
          <>
            <header className={styles.header}>
              <h1 className={styles.appTitle}>TO-DO APP</h1>
              <div className={styles.searchContainer}>
                <Search size={20} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search To-do"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </header>

            <main className={styles.main}>
              <TaskList onEditTask={handleEditTask} searchQuery={searchQuery} />
            </main>

            <Button
              className={styles.fab}
              onClick={handleAddTask}
              aria-label="Add Task"
            >
              <Plus size={28} color="white" />
            </Button>
          </>
        ) : (
          editingTask ? (
            <EditTaskForm
              task={editingTask}
              onClose={closeForm}
            />
          ) : (
            <AddTaskForm
              onClose={closeForm}
            />
          )
        )}
      </div>
    </TaskProvider>
  );
}

export default App;
