import React from "react";
import styled from "styled-components";

const SubTitle = styled.h2`
  text-align: center;
  color: #dddddd;
`;

export default function LocationDisplay({ address }) {
  return address ? <SubTitle>현재 위치: "{address}"</SubTitle> : null;
}