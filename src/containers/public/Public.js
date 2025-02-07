import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-100">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none bg-main-200">
                    <SidebarLeft />
                </div>
                <div className="flex-auto">
                    <div className='h-[70px] px-[59px] bg-[#FFFFFF] flex items-center'>
                        <Header />
                    </div>
                    <Outlet />
                    <div className="w-full h-[500px]"></div>
                </div>
                <div className="w-[240px] hidden 1200:flex flex-none bg-main-200 animate-slide-left">
                    <SidebarRight />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[80px]">
                <Player />
            </div>
        </div>
    )
}

export default Public