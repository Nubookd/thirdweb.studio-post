"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/layout/Login/LoginModal";
import LoginOutModal from "@/components/layout/Login/LoginOutModal/LoginOutModal";
import useLoginStore from "@/store/useLoginStore";

import useModalStore from "@/store/useModalStore";
import useLogOutModal from "@/store/useLogOutModalStore";

export default function LayoutClient({ children }) {
  const { showModal } = useModalStore();
  const { showLogOutModal } = useLogOutModal();

  return (
    <>
      <Header />

      {showModal && <LoginModal />}
      {showLogOutModal && <LoginOutModal />}
      {children}
      <Footer />
    </>
  );
}
