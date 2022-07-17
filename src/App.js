import './App.css';
import React,{Suspense, lazy, useState} from 'react'
import Header from './components/header/header';
import Footer from './components/footer/footer';
/* import Landingpage from './screen/langingpaage/landingpage'; */
import { Routes, Route } from "react-router-dom";
import Mynote from './screen/my note/Mynote';
import LogingScreen from './LogingScreen/LogingScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import CreateNotes from './screen/CreateNotes';
import SingleNote from './screen/SingleNote';
import ProfileScreen from './screen/profileScreen/ProfileScreen';
  const Landingpage = lazy( ()=> new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./screen/langingpaage/landingpage'));
    }, 2000 ,);
  }))
function App() {

  const [search, setSearch] = useState("")
  console.log(search);
  return (
    <div className="App">
     
<Header setSearch={setSearch}/>
<Suspense fallback={<div className="loder"><img src="https://www.lycoseduonline.com/images/success-2.gif" alt="" srcset="" /></div>}>
<main style={{minHeight:"85vh"}}>
   <Routes>
        <Route path="/" element={<Landingpage/>} excect='/'/>
        <Route path="/login" element={<LogingScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/createnote" element={<CreateNotes/>} />
        <Route path="/note/:id" element={<SingleNote/>} />
        <Route path="/mynote" element={<Mynote search={search}/>} />
      </Routes>
      
</main>
</Suspense>
<Footer/>
    </div>
  );
}

export default App;
