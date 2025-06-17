import { Box } from "@mui/material";
// import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import SideBare from "../SideBar/SideBar";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <SideBare />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AdminNavBar />
        <Outlet />
      </Box>
    </Box>
  );
}
