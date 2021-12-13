import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useUser } from "redux/UserSlice";

const Layout = ({ children, withAuth }) => {
  const { userDispatch, userState } = useUser();
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      userDispatch.loginUser(parsed);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (userState.access_token) {
      setLoaded(true);
    }
  }, [userState.access_token, withAuth]);

  return (
    <React.Fragment>
      <Head>
        <title>Media Budget Allocator</title>
      </Head>
      {/* <Navbar /> */}
      {loaded || !withAuth ? children : null}
    </React.Fragment>
  );
};

export default Layout;
