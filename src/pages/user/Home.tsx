import { useEffect, useState } from "react";
import Sidebar from "../../components/HomeComponent/SidebarComponent";
import MainBody from "../../components/HomeComponent/MainBodyComponent";
import Search from "../../components/HomeComponent/SearchComponent";
import Message from "../../components/HomeComponent/MessageComponent";
import Post from "../../components/HomeComponent/PostComponent";
import Profile from "../../components/HomeComponent/ProfileComponent";
import Create from "../../components/HomeComponent/CreateComponent";
import Notification from "../../components/HomeComponent/NotificationComponent";
import Footer from "../../components/HomeComponent/FooterComponent";
import Settings from "./Settings";

const Home = () => {
  const [selectedMenu, setSelectedMenu]: any = useState(0);
  const [sidebaropen, setSidebarOpen] = useState(true);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth;
  //     const breakpoint = 768;
  //     if (width < breakpoint) {
  //       console.log("if");

  //       setSidebarOpen(false)
  //     } else {
  //       console.log("Else");
  //       setSidebarOpen(true)
  //     }
  //   };
  //     handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const renderMainComponent = () => {
    switch (selectedMenu) {
      case 0:
        return <MainBody />;
      case 1:
        return <Search />;
      case 2:
        return <Message />;
      case 3:
        return <Post />;
      case 4:
        return <Profile />;
      case 5:
        return <Create />;
      case 6:
        return <Notification />;
      case 7:
        return <Settings setSidebarOpen={setSidebarOpen} />;
      default:
        return <MainBody />;
    }
  };  

  return (
    <>
      <div className="r">
        <div className="fixed sm:z-10 h-screen hidden sm:flex">
          <Sidebar
            setSelectedMenu={setSelectedMenu}
            selectedMenu={selectedMenu}
            open={sidebaropen}
          />
        </div>
        <div className={`${selectedMenu == 7 ? "sm:ml-0 sm:flex":"sm:ml-60 sm:p-7 md:p-2 lg:ml-72 " }`}>
          {renderMainComponent()}
        </div>
      </div>
      <div className="fixed bottom-0 border-y border-teal-900 sm:hidden w-full flex justify-around items-center p-4 z-10 bg-white">
        <Footer />
      </div>
    </>
  );
};

export default Home;
