import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Users, Blog } from "../pages/admin";
import { AdminLayout } from "../layouts/Admin";
const user = { name: "ricardo" };
function adminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {/* Si el usuario es null-- me manda a la página de Login */}
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => (
            <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      )}
    </Routes>
  );
}

export default adminRouter;
