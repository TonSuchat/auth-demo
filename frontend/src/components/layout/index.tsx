import React from "react";
import useFetch from "use-http";

import { logout } from "../../auth";
import TopBar from "../TopBar";

type LayoutType = {
  children?: any;
  history?: any;
};

const Index: React.FC<LayoutType> = (props: any) => {
  const { get, response } = useFetch();

  const onLogout = async () => {
    await get("/logout");
    if (response.ok) {
      logout();
      props.history.push("/login");
    }
  };

  return (
    <div className="container">
      <TopBar onLogout={onLogout} />
      {props.children}
    </div>
  );
};

export default Index;
