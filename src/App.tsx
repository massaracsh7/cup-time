import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";
import { Main } from "./modules/Main/Main";
import { BrowserRouter } from 'react-router-dom';
import React from 'react'; // Не обязательно, но полезно для типизации в TypeScript

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
