import React, { useState, useEffect, Fragment, useContext } from "react";
import AuthContext from "../../../contexts/auth";
import { FRONT_BASEURL } from "../../../services/api";

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const { Logout } = useContext(AuthContext);

  useEffect(() => {
    Logout();
    setLoading(false);
  }, []);

  return <div>{loading === false && <Fragment></Fragment>}</div>;
}
