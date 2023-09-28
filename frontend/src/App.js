import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components2/Header'
import './App.css'

const App = () => {
  return (
    <>
    <Header />
    <main>
      <Container>
        <ToastContainer />
        <Outlet />
      </Container>
    </main>
    </>
  )
}

export default App