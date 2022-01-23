import React from "react";
import { useParams } from "react-router";

export default function Repositorio() {
  const { repositorio } = useParams();
  return (
    <>
      <h1 style={{ color: "#FFF" }}>Repositórios</h1>
      <span style={{ color: "#FFF" }}>{decodeURIComponent(repositorio)}</span>
    </>
  );
}
