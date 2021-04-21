import { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Comp from './components/Comp';
import Modal from './components/Modal';
import Sample from './components/Sample';
import Sidebar from './components/Sidebar';

function App() {



  return (
    <div className="app">
      <Canvas />
      <Sidebar />
    </div>
  );
}

export default App;
