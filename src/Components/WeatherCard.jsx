import React from "react";
import styled from "styled-components";

const Card = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  border-radius: 16px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const Date = styled.p`
  margin: 0 0 6px 0;
  font-weight: 700;
  font-size: 1.1rem;
`;

const Temp = styled.p`
  margin: 4px 0;
  font-size: 1rem;
`;

const Desc = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #cccccc;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
`;

export default function WeatherCard({ date, temp, desc, icon }) {
  return (
    <Card>
      <Icon
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={desc}
      />
      <Info>
        <Date>{date}</Date>
        <Temp>온도: {temp.toFixed(1)} °C</Temp>
        <Desc>날씨: {desc}</Desc>
      </Info>
    </Card>
  );
}