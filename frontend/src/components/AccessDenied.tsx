import React from "react";

type AccessDeniedType = {
  title: string;
  subtitle?: string;
};

const AccessDenied: React.FC<AccessDeniedType> = ({ title, subtitle }) => {
  return (
    <div className="hero is-danger">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          {subtitle && <h2 className="subtitle">{subtitle}</h2>}
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
