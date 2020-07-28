import React, { useState } from "react";
import Register from "./Register";

const Index: React.FC = (props: any) => {
  const [error, setError] = useState("");

  const onRegister = async (data: Record<string, any>) => {
    try {
      await fetch("/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      props.history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return <Register onRegister={onRegister} error={error} />;
};

export default Index;
