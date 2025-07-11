import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LocationDisplay from "../Components/LocationDisplay";
import WeatherInfo from "../Components/WeatherInfo";
import { useWeather } from "../Components/useWeather";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: black;
  color: #f0f0f0;
  min-height: 100vh;
`;

const Button = styled.button`
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

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
`;

// 주소 변환 함수
const fetchKakaoAddress = async (lat, lon) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  const roadAddress = data?.documents?.[0]?.road_address?.address_name;
  const jibunAddress = data?.documents?.[0]?.address?.address_name;
  return roadAddress || jibunAddress || "주소 확인 불가";
};

export default function Home() {
  const dummyLocation = { lat: 36.8156, lon: 127.1131 };  // 위치못불러오면 천안시청으로.
  const [location, setLocation] = useState(dummyLocation);
  const [address, setAddress] = useState("");
  const { weatherData, error, loading } = useWeather(location);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      () => {
        alert("위치 정보를 가져올 수 없습니다. 기본 위치(천안시청)를 사용합니다.");
        setLocation(dummyLocation);
      }
    );
  };

  useEffect(() => {
    const updateAddress = async () => {
      const addr = await fetchKakaoAddress(location.lat, location.lon);
      setAddress(addr);
    };
    updateAddress();
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Container>
      <Title> Weather Info </Title>
      <Button onClick={getLocation}>내 위치 불러오기</Button>
      <LocationDisplay address={address} />
      <WeatherInfo weatherData={weatherData} error={error} loading={loading} />
    </Container>
  );
}
