// page.jsx

"use client";

import Main from "@/components/features/Main";
// import Post from "@/components/features/Post";
import useLoginStore from "@/store/useLoginStore";
import { useEffect, useState } from "react";

export default function Home() {
  const initLogin = useLoginStore((state) => state.initLogin);
  useEffect(() => {
    initLogin();
  }, []);

  return (
    <>
      <Main />
      {/* <Post /> */}
    </>
  );
}
