import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageWrap, Container, Card, PrimaryButton, NavButton, FooterWrap, Circle } from "../styles/styledBits";
import { clearSession, readSession } from "../utils/session";
import { Navbar } from "../components/Navbar";
import { HeroWave } from "../components/HeroWave";
import { LuFilter } from 'react-icons/lu';
import { LuTickets } from 'react-icons/lu';
import { FaHighlighter } from 'react-icons/fa6';
import { MdMoneyOff } from 'react-icons/md';

const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 40px;
`;

const HeroInner = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 40px 0;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
`;

const HeroTextBlock = styled.div`
  flex: 1 1 480px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  color: #0f172a;
`;

const HeroDescription = styled.p`
  color: #6b7280;
  max-width: 680px;
`;

const HeroButtons = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 12px;
`;

const StatsCardWrap = styled.div`
  flex: 0 1 380px;
  margin-right: 70px;
  text-align: center;

  @media(max-width: 1025px) {
    margin: auto;
    flex: 0 1 480px;
    padding-top: 20px;
  }
`;

const StatsHeading = styled.h3`
  margin-top: 0;
`;

const QuickStats = styled.div`
  display: flex;
  gap: 12px;
  
`;

const StatsItem = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const StatValue = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const FeaturesSection = styled.section`
  margin: 40px 0px;
  padding: 12px 30px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 12px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px;
  background-color: #ebe5ddff;

  svg{
    width: 25px;    
    height: auto;   
    aspect-ratio: 1;
  }
`;

const FeatureItemTitle = styled.div`
  font-weight: 700;
`;

const FeatureItemDesc = styled.div`
  color: #6b7280;
  font-size: 13px;
`;

const WaveWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  @media(min-width: 1025px) {
    bottom: -25px;
  }
  @media(min-width: 1500px) {
    bottom: -100px;
  }
`;

export default function LandingPage() {
  const session = readSession();
  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <PageWrap>
      <Navbar onLogout={handleLogout}/>

      <HeroSection>
        <Circle color="#2563eb" size="220px" x="-40px" y="-30px" style={{ left: -60, top: -20 }} />
        <Circle color="#10b981" size="140px" x="0" y="0" style={{ right: -40, top: 40 }} />
        <Circle color="#b9a810ff" size="180px" x="-120px" y="60px" style={{ right: -20, top: 40 }} />
        <Circle color="#b95c10ff" size="100px" x="-620px" y="10px" style={{ right: -20, top: 100 }} />
        <Circle color="#b9106dff" size="300px" x="-320px" y="20px" style={{ right: 450, top: 130 }} />

        <Container px="38px">
          <HeroInner>
            <HeroTextBlock>
              <HeroTitle>Ticketi•fy</HeroTitle>
              <HeroDescription>
                Streamline your support workflow with our simple ticket management system.
                Create, update, and track tickets quickly — built with a react and styled with styled components.
              </HeroDescription>
              { !session && 
                <HeroButtons>
                  <Link to="/auth/signup">
                    <PrimaryButton aria-label="Create account">Get Started</PrimaryButton>
                  </Link>
                  <Link to="/auth/login">
                    <NavButton aria-label="Login">Login</NavButton>
                  </Link>
                </HeroButtons>
              }
            </HeroTextBlock>

            <StatsCardWrap>
              <Card aria-hidden>
                <StatsHeading>Quick stats</StatsHeading>
                <QuickStats>
                  <StatsItem>
                    <StatLabel>Open</StatLabel>
                    <StatValue>3</StatValue>
                  </StatsItem>
                  <StatsItem>
                    <StatLabel>In Progress</StatLabel>
                    <StatValue>1</StatValue>
                  </StatsItem>
                  <StatsItem>
                    <StatLabel>Closed</StatLabel>
                    <StatValue>1</StatValue>
                  </StatsItem>
                </QuickStats>
              </Card>
            </StatsCardWrap>
          </HeroInner>
        </Container>

        <WaveWrapper>
          <HeroWave />
        </WaveWrapper>
      </HeroSection>

      <Container px="0">
        <FeaturesSection>
          <h2>Features</h2>
          <FeatureGrid>
            <FeatureItem>
              <LuTickets />
              <div>
                <FeatureItemTitle>Tickets</FeatureItemTitle>
                <FeatureItemDesc>Create and manage tickets</FeatureItemDesc>
              </div>
            </FeatureItem>
            <FeatureItem>
              <LuFilter />
              <div>
                <FeatureItemTitle>Filters</FeatureItemTitle>
                <FeatureItemDesc>Search & filter tickets</FeatureItemDesc>
              </div>
            </FeatureItem>
            <FeatureItem>
              <FaHighlighter />
              <div>
                <FeatureItemTitle>Light UI</FeatureItemTitle>
                <FeatureItemDesc>Clean SaaS card UI</FeatureItemDesc>
              </div>
            </FeatureItem>
            <FeatureItem>
              <MdMoneyOff />
              <div>
                <FeatureItemTitle>Free</FeatureItemTitle>
                <FeatureItemDesc>No recurring payments</FeatureItemDesc>
              </div>
            </FeatureItem>
          </FeatureGrid>
        </FeaturesSection>
      </Container>

      <FooterWrap>
        {new Date().getFullYear()} Ticketi•fy — © UnSiMplYkells
      </FooterWrap>
    </PageWrap>
  );
}