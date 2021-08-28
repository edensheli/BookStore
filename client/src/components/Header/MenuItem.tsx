import React from "react";
import { Nav } from "react-bootstrap";

function MenuItem(props: any) {
  return (
    <Nav.Link
      style={{ color: window.location.pathname === props.to ? "#fff" : "" }}
      href={props.to}
    >
      {props.children}
    </Nav.Link>
  );
}

export default MenuItem;
