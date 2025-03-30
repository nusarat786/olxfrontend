import React from "react";
import  Banner  from "./Banner";
import AdminPortal from "./AdminPortal";

export default function AdminHome() {
  return (
    <div className="container-fluid">
      <div className="row">

        <Banner bannerHeading={"Welcome To Admin"} imageUrl={"../../Images/admin_png.png"}/>
        <AdminPortal/>  
      </div>
    </div>
  );
}