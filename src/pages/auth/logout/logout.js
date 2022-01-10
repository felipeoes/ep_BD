import React, { useState, useEffect, Fragment, useContext } from "react";
import AuthContext from "../../../contexts/auth";

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const { Logout } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("https://farma-usp.herokuapp.com/login");
    } else {
      Logout();
      setLoading(false);
    }
  }, []);

  return <div>{loading === false && <Fragment></Fragment>}</div>;
}
