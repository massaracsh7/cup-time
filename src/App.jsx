import { Footer } from "./modules/Footer";
import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter >
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}

export default App;
