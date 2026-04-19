import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import {Routes, Route}  from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/product" element = {<ProductPage/>}/>
        <Route path="/product/:id" element = {<ProductPage/>}/>

      </Routes>
    </div>
  )
}

export default App
