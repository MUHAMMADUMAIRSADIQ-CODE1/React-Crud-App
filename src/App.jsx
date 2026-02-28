import { useContext, useState } from 'react'


import Header from './Components/Header/Header'
import SideBar from './Components/SideBar/SideBar'
import Form from './Components/Form/Form'
import Card from './Components/Cards/Card'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import { context, ContextApp } from './Store/context'
import LoginScreen from './Components/loginFirst/login'
import Loader from './Components/Loader/Loader'
import Contact from './Components/Contact/Contact'
function App() {
  const [State, setState] = useState("Home")
  let { toggle, none, user, loginWithGoogle, logout, loading } = useContext(context)
  if (loading) return <Loader />;
  return (
    <>

      {user ? <>
        <Header setState={setState} />
        <SideBar State={State} setState={setState} />
        <div className={`cards ${(toggle && none) ? "Margin" : toggle ? "" : "Margin"}`}>
          {State === "Home" ? <Form /> : State === "Contact" ? <Contact /> : <Card />}
        </div>
        <Footer /></> : <LoginScreen />}


    </>
  )
}

export default App;
