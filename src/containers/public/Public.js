import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player } from "../../components";

const Public = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-main-100">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] flex-none bg-main-200">
                    <SidebarLeft />
                </div>
                <div className="flex-auto">
                    <Outlet />
                </div>
                <div className="w-[240px] hidden 1200:flex flex-none bg-main-200 animate-slide-left">
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none h-[90px]">
                <Player />
            </div>
        </div>
    )
}

export default Public