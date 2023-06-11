// import { Outlet } from "react-router-dom";
// import Header from "../pages/Shared/Header/Header";
// import Footer from "../pages/Shared/Footer/Footer";


// const Main = () => {
//     return (
//         <div>
//             <Header/>
//             <Outlet />
//            <Footer/>
//         </div>
//     );
// };

// export default Main;
import  { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  const [themeMode, setThemeMode] = useState("light");

  const darkThemeStyles = {
    background: "#333",
    color: "#fff",
  };

  const lightThemeStyles = {
    background: "#fff",
    color: "#333",
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <div style={themeMode === "dark" ? darkThemeStyles : lightThemeStyles}>
      
      <button className={`${themeMode === "dark" ? "dark-theme" : "light-theme"}`} onClick={toggleTheme}>
        <FaMoon />
      </button>

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
