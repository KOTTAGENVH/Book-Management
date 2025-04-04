"use client";

import { useBackgroundContext } from "@/contextApi/darkModeState";
import React from "react";

function Loader() {
    const { status } = useBackgroundContext();
    return (
        <div className={`h-screen min-w-screen overflow-y-auto overflow-x-hidden ${status ? "bg-bg-gradient-two" : "bg-bg-gradient-one"}  relative overflow-y-auto overflow-x-hidden relative `}>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-white text-lg font-semibold ml-2">
                    Loading
                    <span className="dot ml-1 animate-blink">.</span>
                    <span className="dot ml-1 animate-blink delay-150">.</span>
                    <span className="dot ml-1 animate-blink delay-300">.</span>
                </div>

                <div className="w-[200px] h-[30px] bg-neutral-900 shadow-inner shadow-black/60 rounded-full p-[5px] box-border overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-full">
                        <div className="animate-loading w-full h-[20px] rounded-full bg-gradient-to-t from-[#de4a0f] to-[#f9c74f] relative flex justify-center items-center">
                            <div className="absolute flex gap-4">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-[10px] h-[45px] opacity-30 rotate-45 bg-gradient-to-br from-white to-transparent"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
