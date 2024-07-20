import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../ui/navbar";
import { Button } from "@nextui-org/button";
import { LogOut } from "lucide-react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import background from "../../assets/img/loginbg.jpg";

const Layout = () => {
  const navigate = useNavigate();

  async function logout() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: `cover`,
      }}
    >
      <Button
        className="fixed z-50 top-4 right-4"
        color="secondary"
        onClick={logout}
      >
        <LogOut className="h-5"></LogOut>
        Logout
      </Button>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
