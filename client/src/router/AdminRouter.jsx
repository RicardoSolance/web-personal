import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Users, Blog, Courses, Menu, NewsLetter } from "../pages/admin";
import { AdminLayout } from "../layouts/Admin";
import { useAuth } from "../hooks";
const user = null;
function adminRouter() {
  const { user } = useAuth();
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
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => (
            <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="/admin/newsletter" element={loadLayout(AdminLayout, NewsLetter)} />
        </>
      )}
    </Routes>
  );
}

export default adminRouter;
