import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LaunchDetailPage from './pages/LaunchDetailPage.tsx';
import ContactPage from './pages/ContactPage.tsx';  

function App() {
  return (

    <BrowserRouter>
      
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launch/:id" element={<LaunchDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App