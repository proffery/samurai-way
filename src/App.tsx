import styled from "styled-components";
import { HashRouter as Router, Route } from 'react-router-dom'
import { Footer } from "./layout/footer/Footer";
import { Navbar } from "./layout/navbar/Navbar";
import { Header } from "./layout/header/Header";
import { Container } from "./components/Container";



function App() {

  return (
    <>
      <Container>
        <Navbar />
        <Header />
        <Router >
        
        </Router>
      </Container>
      <Footer />
    </>
  );
}

export default App;