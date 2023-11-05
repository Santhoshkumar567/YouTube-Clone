import React  from "react";
import Home from "./pages/Home"
import Video from "./pages/Video"
import Navbar from './components/FixedComponents/Navbar'
import Sidebar from "./components/FixedComponents/Sidebar"
import Signin from "./components/UserAuth/Signin"
import Search from "./components/FixedComponents/Search"
import Error404 from "./pages/Error404"
import SignUp from "./components/UserAuth/SignUp"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ChannelInfo from "./components/channelInformation/ChannelInfo";
function App() {
 
  return (
   <div className="bg_body custom-scrollbar overflow-y-scroll">
    <BrowserRouter>
    <Navbar />
    <Sidebar />
    <Routes>
  
      <Route path="/">
        <Route index element={<Home type="random" />}/>
        <Route path="trends" element={<Home type="trend" /> } />
        <Route path="subcriptions" element={<Home type="sub" /> } />
        <Route path="likedvideos"  element={<Home type= "likedvideos" />}/>
        <Route path="search" element={<Search    /> } />
       
        <Route path="signin">
          <Route index  element={<Signin />} />
          <Route path="signup" element={ <SignUp />} />
        </Route>

       
        <Route path="video">
          <Route path=":id" element={<Video />} />
        </Route>
        <Route path="userdetails" element = {<ChannelInfo />} />
        <Route path="*" element={<Error404 />} />
      </Route>
   
  </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
