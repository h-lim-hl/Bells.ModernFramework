import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useFlashMessage } from './FlashMessageStore';
import { useJwt } from "./UserStore";

const UserLogout = () => {
  const { clearJwt } = useJwt();
  const { showMessage } = useFlashMessage();
  const [, setLocation] = useLocation();
  useEffect(() => {
    clearJwt();
    showMessage("Logout Successful", 'success');
    setLocation("/");
  }, []);

  return (<></>);
}

export default UserLogout;