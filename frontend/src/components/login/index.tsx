import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Login from "./Login";
import { instance } from "../../apis/apiBase";
import { setAuthen, checkIsAuthen } from "../../auth";

const Index: React.FC = (props: any) => {
  const [error, setError] = useState("");

  const onLogin = async (data: Record<string, any>) => {
    try {
      const response = await instance.post("/user/login", data);
      if (response.status === 200) {
        setAuthen(response.data);
        props.history.push("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (checkIsAuthen()) {
    return <Redirect to="/dashboard" />;
  }

  return <Login onLogin={onLogin} error={error} />;
};

export default Index;
