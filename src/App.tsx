/* === File: src/App.jsx === */
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import About from './pages/About';

const App = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  return (
    <Layout>
      <Routes>
        <Route path={basePath} element={<Home />} />
        <Route path={basePath + 'about'} element={<About />} />
      </Routes>
    </Layout>
  );
};

export default App
