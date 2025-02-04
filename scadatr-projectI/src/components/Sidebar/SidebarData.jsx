import React from "react";
import { MdDashboard } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { LuLogs } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { GrConfigure } from "react-icons/gr";

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <MdDashboard />,
        link: "/dashboard"
    },
    {
        title: "Alertas",
        icon: <GoAlertFill />,
        link: "/alertas"
    },
    {
        title: "Logs",
        icon: <LuLogs />,
        link: "/logs"
    },
    {
        title: "Relatórios",
        icon: <TbReportAnalytics />,
        link: "/relatorios"
    },
    {
        title: "Utilizadores",
        icon: <FaUsers />,
        link: "/utilizadores"
    },
    {
        title: "Configurações",
        icon: <GrConfigure  />,
        link: "/configuracoes"
    },
]