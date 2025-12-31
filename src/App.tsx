import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (

    <BrowserRouter>
      
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App