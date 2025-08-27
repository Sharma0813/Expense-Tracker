import React from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import axios from "axios";
import { toast } from 'react-toastify';


const Navbar = () => {
  const user = true;
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try{
        // network call
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if(res.data.success){
          navigate("/login");
          toast.success(res.data.message);
      }
    }catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }
  return (
    <div className="border-b border-gray-500">
      <div className="flex items-center justify-between max-w-5xl mx-auto py-5">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="[width:40px] [height:40px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="w-30 h-30 object-contain block"
                  style={{ maxWidth: "5rem", maxHeight: "5rem" }}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent >
                <Button variant="link" onClick={logoutHandler}>Logout</Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
