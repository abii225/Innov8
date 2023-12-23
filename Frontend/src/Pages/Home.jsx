import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const FirstDiv = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
`;

const SecondDiv = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #e0e0e0;
`;

const StartButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const Img=styled.img`
  display:block;
  width:80%;
  margin-bottom:10px;
`

export const Home = () => {
  return (
    <HomePageWrapper>
      <FirstDiv>
        <h4>
          From transformative solutions to curated content, discover the essence of what makes us unique.
          Join us on this journey, where every click opens a door to possibilities.
        </h4>
        <Img  src="https://www.xrtoday.com/wp-content/uploads/2021/12/Artificial_Intelligence_Metaverse_Bridging_Virtual_Real-.jpg"/>
        <Link to="/info">
          <StartButton>Start</StartButton>
        </Link>
      </FirstDiv>
      <SecondDiv>
        <h3>
          Welcome to "Innov-8", where innovation meets convenience in the world of online interviews!
          Say goodbye to traditional hiring hassles and hello to a seamless, user-friendly experience.
          Elevate your interview process with our cutting-edge platform that brings employers and candidates
          together effortlessly. It's time to redefine the way you connect, evaluate, and hire talent – all
          at the click of a button. Let's make interviews more than just a conversation; let's make them a
          success story waiting to happen!
        </h3>
      </SecondDiv>
    </HomePageWrapper>
  );
};



