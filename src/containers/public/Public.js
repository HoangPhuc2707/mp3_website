import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
    return (
        <div className="w-full flex ">
            <div className="w-[240px] flex-none bg-[#F2F2F2]">
                <SidebarLeft />
            </div>
            <div className="flex-auto">
                <Outlet />
            </div>
            <div className="w-[240px] flex-none bg-[#F2F2F2] border border-green-500">
                <SidebarRight />
            </div>
        </div>
    )
}

export default Public