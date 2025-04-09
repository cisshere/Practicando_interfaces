import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home, { Page2 } from "./pages/home";
import { UserProvider } from "./types/context";

function App() {



  return (
    <>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pepe" element={<Page2 />} />
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
