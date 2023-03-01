import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Blog, Contact, Post, Courses } from "../pages/web";
import { ClientLayout } from "../layouts/Client";

function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/Blog" element={loadLayout(ClientLayout, Blog)} />
      <Route path="/contact" element={loadLayout(ClientLayout, Contact)} />
      <Route path="/Blog/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}

export default WebRouter;
