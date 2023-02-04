// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import './App.css';
import { Header } from './components/Header';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <img src="./assets/react.svg" />
      {/* <img               src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} /> */}
    </div>
  );
}

export default App;
