import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import useFetch from "use-http";

import Login from "./Login";
import { setAuthen, checkIsAuthen } from "../../auth";

const Index: React.FC = (props: any) => {
  const [error, setError] = useState("");
  const { post, response } = useFetch({ data: [] });

  const onLogin = async (data: Record<string, any>) => {
    const res = await post("/login", data);
    if (response.ok) {
      setAuthen(res.data);
      props.history.push("/dashboard");
    } else setError(res);
  };

  if (checkIsAuthen()) {
    return <Redirect to="/dashboard" />;
  }

  return <Login onLogin={onLogin} error={error} />;
};

export default Index;
