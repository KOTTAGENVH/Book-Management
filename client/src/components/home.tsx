
import { useBackgroundContext } from '@/contextApi/darkModeState';
import React from 'react'

function Protected() {
  const {status} = useBackgroundContext();
  return (
    //${status ? "bg-bg-gradient-four" : "bg-bg-gradient-one"}
    <div className={`h-auto md:h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
     
       sdsdsd
       sdsd
    </div>
  )
}

export default Protected;
