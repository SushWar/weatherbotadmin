"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const formRef = useRef(null);
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const bgImage = {
    backgroundImage: `url(https://www.kunocreative.com/hubfs/Chatbot-evolution-1.png)`,
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmitBtn = async (event: any) => {
    try {
      setDisable(true);
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      toast.error("Sign In Failed, Please try after some time");
    } finally {
      setDisable(false);
    }
  };

  
  if (session.status === "authenticated") {
    const send = async () => {
      try {
        const body = {
          name: session.data.user?.name,
          email: session.data.user?.email,
        };
        const res = await axios.post("/api/credential", body);
        if(res.status===200){
          toast.success("Login Success");
          router.push('/admin')
        }
      } catch (error) {
        toast.error("Login Failed");
      }
    }
    send()

    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  } else if (session.status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className=" bg-no-repeat bg-cover" style={bgImage}>
        <div className=" min-h-screen flex justify-center w-full items-center">
          <form ref={formRef} className=" bg-purple-200 rounded-xl">
            <div className=" m-6 px-3">
              <div className=" text-center capitalize text-3xl pb-10">
                <h1>Sign in</h1>
              </div>
              <div className=" pt-5">
                <TextField
                  required
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Email address"
                  className=" w-full"
                  inputProps={{ style: { backgroundColor: "#e2e8f0" } }}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                />
              </div>
              <div className="pt-5">
                <TextField
                  required
                  label="Password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className=" w-full"
                  inputProps={{ style: { backgroundColor: "#e2e8f0" } }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className=" pt-10 text-center">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "slategray", color:"white" }}
                  type="submit"
                  onClick={async (e) => {
                    loginSubmitBtn(e)
                  }}
                  disabled={true}
                >
                  Login Button
                </Button>
              </div>
              <div className=" py-4 text-center">
                <Button
                  variant="contained"
                  style={{ color: "black" }}
                  endIcon={<GoogleIcon />}
                  onClick={async () => {
                    await signIn("google");
                  }}
                  disabled={disable}
                >
                  Login with Google
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

