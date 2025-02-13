import styled from "styled-components";
import "primeicons/primeicons.css";

export const Contenedor = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1rem 0;
`;

export const GrupoBotones = styled.div`
  display: flex;
  padding: 2rem 1rem;
  justify-content: flex-end;
`;
