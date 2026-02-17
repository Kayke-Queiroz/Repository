import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/home';
import Curriculo from './pages/curriculo';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculo" element={<Curriculo />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
