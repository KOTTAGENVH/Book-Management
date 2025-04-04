"use client";
import Header from '@/components/header';
import Loader from '@/components/loader';
import { useBackgroundContext } from '@/contextApi/darkModeState';
import useAuth from '@/hooks/useAuth';
import React from 'react'

function Page() {
  const [, token, , loading] = useAuth();
  const { status } = useBackgroundContext();

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={`h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
      <Header />
      page
      </div>
  )
}

export default Page;