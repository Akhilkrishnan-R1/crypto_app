
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CoinPage from './pages/CoinPage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/coin/:id" element={<CoinPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
