import React from "react";

const AdminLayout = (props) => {
  const { children } = props;
  return (
    <div>
      <h2> Se esta usando el admin Layout</h2>
      {children}
    </div>
  );
};

export { AdminLayout };
