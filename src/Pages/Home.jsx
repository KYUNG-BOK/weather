import React, { useState } from "react";
import styled from "styled-components";
import WeatherCard from "../Components/WeatherCard";
import { useWeather } from "../Components/useWeather";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color:rgb(0, 0, 0);
  color: #f0f0f0;
  min-height: 100vh;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 30px auto;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  background-color: #0077ff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #005fcc;
  }
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

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  color: #ffffff;
`;

const SubTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #dddddd;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto 30px auto;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  background-color: #1e1e1e;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333;
  }
`;

const getKoreanCityName = (engName) =>
  ({
    Seoul: "서울",
    Busan: "부산",
    Incheon: "인천",
    Daegu: "대구",
    Daejeon: "대전",
    Gwangju: "광주",
    Ulsan: "울산",
    Jeju: "제주",
    Cheonan: "천안",
  }[engName] || engName);

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

export default function Home() {
  const dummyLocation = { lat: 36.9079, lon: 127.1817 };
  const [location, setLocation] = useState(dummyLocation);
  const { weatherData, error, loading } = useWeather(location);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {
        setLocation(dummyLocation);
        alert("위치 정보를 가져올 수 없습니다. 기본 위치(천안시 성환읍)를 사용합니다.");
      }
    );
  };

  return (
    <Container>
      <Title>Weather Info</Title>
      <StyledButton onClick={getLocation}>내 위치 불러오기</StyledButton>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {loading ? (
        <SubTitle>날씨 데이터를 불러오는 중입니다...</SubTitle>
      ) : weatherData ? (
        <>
          <SubTitle>
            "{getKoreanCityName(weatherData.city.name)}"의 최근 5일간 날씨
          </SubTitle>
          <WeatherList>
            {weatherData.list.slice(0, 5).map((item) => {
              const date = new Date(item.dt * 1000);
              const formattedDate = date.toLocaleDateString("ko-KR", {
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
      ) : (
        <SubTitle>날씨 데이터를 불러올 수 없습니다.</SubTitle>
      )}
    </Container>
  );
}