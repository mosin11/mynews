
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  
  const routes = [
    { path: "/", category: "General" },
    { path: "/General", category: "General" },
    { path: "/business", category: "Business" },
    { path: "/entertainment", category: "Entertainment" },
    { path: "/health", category: "Health" },
    { path: "/science", category: "Science" },
    { path: "/sports", category: "Sports" },
    { path: "/technology", category: "Technology" }
  ];
  return (
    <div>
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {routes.map(({ path, category }) => (
            <Route key={path} path={path} element={<News key={path} country='in' category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
