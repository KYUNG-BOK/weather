import React from "react";
import styled from "styled-components";
import WeatherCard from "./WeatherCard";

const SubTitle = styled.h2`
  text-align: center;
  color: #dddddd;
`;

const ErrorMsg = styled.p`
  color: #ff3333;
  text-align: center;
  margin-bottom: 20px;
`;

const WeatherList = styled.ul`
  list-style: none;
  padding: 0;
`;

const getKoreanWeatherDescription = (desc) =>
  ({
    "clear sky": "맑음",
    "few clouds": "구름 조금",
    "scattered clouds": "흩어진 구름",
    "broken clouds": "구름 많음",
    "overcast clouds": "흐림",
    "light rain": "약한 비",
    "moderate rain": "보통 비",
    "heavy intensity rain": "강한 비",
    "shower rain": "소나기",
    thunderstorm: "천둥번개",
    snow: "눈",
    mist: "안개",
  }[desc?.toLowerCase()] || desc);

export default function WeatherInfo({ weatherData, error, loading }) {
  if (loading) return <SubTitle>날씨 데이터를 불러오는 중입니다...</SubTitle>;
  if (error) return <ErrorMsg>{error}</ErrorMsg>;
  if (!weatherData?.list?.length) return <SubTitle>날씨 데이터를 불러올 수 없습니다.</SubTitle>;

  // 안전하게 필터링
  const dailyForecasts = weatherData.list.filter(item => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12;
  });

  return (
    <>
      <SubTitle> 기상 예보 </SubTitle>
      <WeatherList>
        {dailyForecasts.slice(0, 5).map((item) => {
          const date = new Date(item.dt * 1000);
          const formattedDate =
            date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) +
            " " +
            date.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            });

          return (
            <WeatherCard
              key={item.dt}
              date={formattedDate}
              temp={item.main.temp}
              desc={getKoreanWeatherDescription(item.weather[0].description)}
              icon={item.weather[0].icon}
            />
          );
        })}
      </WeatherList>
    </>
  );
}

