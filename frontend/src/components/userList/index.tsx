import React, { useEffect, useState } from "react";

import { instance } from "../../apis/apiBase";
import UserList from "./UserList";
import AccessDenied from "../AccessDenied";

const Index: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      const response = await instance.get("/user/getUsers");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      if (error?.response?.data) {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    return <AccessDenied title={error} />;
  }

  return (
    <UserList users={users} />
  );
};

export default Index;
