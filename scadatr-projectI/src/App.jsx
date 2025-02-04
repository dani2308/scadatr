import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm/LoginForm';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';


{/* 
  const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/" />;};
*/}

const App = () => {
{/*
  const isAuthenticated = false; // Replace with actual authentication logic

  <Route path="/app" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<MainLayout> <Dashboard /> </MainLayout>} />} />

*/}

  return (
    <Router>
      <Routes>
      {/*
        <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <MainLayout /> : <LoginForm setIsAuthenticated=
        {setIsAuthenticated} />} />
        */}
        {/* Página de Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Área do Layout Principal */}
        <Route path="/dashboard" element={<MainLayout> <Dashboard /> </MainLayout>} />
        
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </Router>
    
  )
}

export default App
