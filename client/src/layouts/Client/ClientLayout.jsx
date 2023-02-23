import React from "react";

const ClientLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <h2>Estamos en el client Layout</h2>
      {children}
    </div>
  );
};

export { ClientLayout };
