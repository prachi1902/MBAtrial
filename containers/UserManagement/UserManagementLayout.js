import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import axios, { responseHandler, errorHandler } from "@/lib/http";
import { Container } from "components/library";
import Navbar from "components/UserManagement/Navbar";
import FullScreenLoader from "components/common/FullScreenLoader";
import UserDetailedCard from "./UserDetailedCard";
import UserControllers from "./UserControllers";
import RemoveUser from "./RemoveUser";

const UserManagementLayout = () => {
  const [userList, setUserList] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [removeUser, setRemoveUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({ url: "http://20.106.155.34:5005/v1/user/list" })
      .then(responseHandler)
      .then((data) => {
        setUserList(data.users);
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
    axios({ url: "http://20.106.155.34:5005/v1/user/roles?project_name=MBAT" })
      .then(responseHandler)
      .then((data) => {
        setRolesData(data.roles);
      })
      .catch(errorHandler);
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
      <Navbar showInvite title="User Management" />
      <UserControllers active={userList.length} total={userList.length} />
      <Box width="100%" pb="4rem" px="5rem">
        <Container>
          {userList.map((user, i) => (
            <UserDetailedCard
              key={user.id}
              id={user.id}
              img={user.img}
              name={user.name}
              email={user.email}
              roles={rolesData}
              permissions={user.permissions}
              last_login={user.last_login_detail}
              status={user.status}
              setRemoveUser={setRemoveUser}
            />
          ))}
        </Container>
      </Box>
      {removeUser && <RemoveUser setRemoveUser={setRemoveUser} />}
    </>
  );
};

export default UserManagementLayout;
