import React from "react";
import ricon from "../../assets/icon/ricon.png";
import "./AdminLayout.scss";
import { AdminMenu } from "../../components/admin/AdminLayout";
const AdminLayout = (props) => {
  const { children } = props;
  return (
    <div className="admin-layout">
      <div className="admin-layout-left">
        <img className="logo" src={ricon} />
        <AdminMenu />
      </div>
      <div className="admin-layout-right">
        <div className="admin-layout-right-header">
          <span>Logoutttt</span>
        </div>
        <div className="admin-layout-right-content">{children}</div>
      </div>
    </div>
  );
};

export { AdminLayout };
