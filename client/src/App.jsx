import { useState } from 'react';
import CanvasModel from './canvas';
import Customiser from './pages/Customiser';
import Home from './pages/Home';

function App() {

  return (
   <main className="app transition-all ease-in">
    {/* home landing page */}
    <Home/>
    {/* our canvas for our model! */}
    <CanvasModel />
    {/* tabs for colouring, etc the model */}
    <Customiser />
   </main>
  )
}

export default App
