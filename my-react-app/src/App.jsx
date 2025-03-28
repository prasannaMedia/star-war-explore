// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import DetailsPage from './components/DetailsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:entity/:id" element={<DetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;