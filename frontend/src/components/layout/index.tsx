import React from "react";
import { instance } from "../../apis/apiBase";

import { clearUserData } from "../../auth";
import TopBar from "../TopBar";

type LayoutType = {
  children?: any;
  history?: any;
};

const Index: React.FC<LayoutType> = (props: any) => {
  const onLogout = async () => {
    const response = await instance.post("/user/logout");
    if (response.status === 200) {
      clearUserData();
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
