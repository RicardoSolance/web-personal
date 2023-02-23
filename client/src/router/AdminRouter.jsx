import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Users } from "../pages/admin";
import { AdminLayout } from "../layouts/Admin";
const user = null;
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
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      )}
      {/* <Route path='*' element={<Error404/>}/> */}
    </Routes>
  );
}

export default adminRouter;
