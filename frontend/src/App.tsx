import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './pages/dashboard/components/TaskForm';
import TaskList from './pages/dashboard/components/TaskList';
import TaskDetails from './pages/dashboard/components/TaskDetails';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  console.log('ProtectedRoute user:', user);

  if (user === null) {
    // Show loading until user state is determined
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect unauthenticated users
    return <Navigate to="/" />;
  }

  return children;
};

// Not Found Page Component
const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go to Home</a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route - Home */}
              <Route path="/" element={<Home />} />

              {/* Protected Routes with dynamic username */}
              <Route
                path=":username/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                {/* Nested routes under Dashboard */}
                <Route index element={<TaskList />} /> {/* Default for /:username */}
                <Route path="create" element={<TaskForm />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="task/:id" element={<TaskDetails />} />
              </Route>

              {/* Catch-all for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
