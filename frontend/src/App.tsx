import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Payment from '@/pages/Payment';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;