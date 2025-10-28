import styled from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { theme } from "../styles/theme";
import { readSession } from "../utils/session";

const Nav = styled.nav`
  background: ${(p) => p.theme.colors.surface};
  box-shadow: 0 1px 4px ${(p) => p.theme.colors.cardShadow};
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  height: 40px;
`;

const NavInner = styled.div`
  width: inherit;
  height: 100%;
  max-width: ${(p) => p.theme.maxWidth};
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

const Brand = styled.div`
  font-weight: 700;
  color: ${(p) => p.theme.colors.primary};
  font-size: 18px;
  
`;

const Hamburger = styled.button`
  display:none;
  @media(max-width: 720px) {
    display:inline-flex;
  }
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const BrandContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
`;

const NavContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media(min-width: 720px) {
    width: 30%;
  }
`;

const NavLinks = styled.div`
  display:flex;
  justify-content: space-around;
  align-items:center;
  @media(min-width: 720px) {
    width: 100%;
    height: inherit;
  }
  @media(max-width: 720px) {
    width: 120px;
    display: ${(p) => (p.mobileOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 40px;
    background: ${(p) => p.theme.colors.surface};
    box-shadow: 0 6px 18px ${(p) => p.theme.colors.cardShadow};
  }
`;

const StyledNavLink = styled(NavLink)`
  width: inherit;
  height: inherit;
  display:flex;
  align-items:center;
  justify-content: center;
  padding: 0 5px;
  font-weight: 500;
  transition: background-color .2s ease;

  &.active{
    background-color: ${(p) => p.theme.colors.primaryDark};
    color: white;
  }
  &:hover{
    background-color: ${(p) => p.theme.colors.primary};
    color: white;
  }

  @media(max-width: 720px) {
    padding: 8px 0;
  }
`
const LogoutButton = styled(StyledNavLink)`
  background-color: black;

  &:hover,
  &.active {
    background-color: black;
    color: white;
  }
`;

export const Navbar = ({ onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = readSession();

  return (
    <Nav role="navigation" aria-label="Main navigation">
      <NavInner>
        <BrandContainer>
          <Brand>Ticketi•fy</Brand>
          <div style={{ display: "none" }} className="sr-only" aria-hidden> </div>
        </BrandContainer>

        <NavContainer gap="8px">
          <Hamburger
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke={theme.colors.text} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Hamburger>

          <NavLinks mobileOpen={mobileOpen}>
            <StyledNavLink to="/" onClick={() => setMobileOpen(false)}>Home</StyledNavLink>
            {session ? (
              <>
                <StyledNavLink to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</StyledNavLink>
                <StyledNavLink to="/tickets" onClick={() => setMobileOpen(false)}>Tickets</StyledNavLink>
                <LogoutButton onClick={() => { setMobileOpen(false); onLogout && onLogout(); }}>
                  Logout
                </LogoutButton>
              </>
            ) : (
              <>
                <StyledNavLink to="/auth/login" onClick={() => setMobileOpen(false)}>Login</StyledNavLink>
                <StyledNavLink to="/auth/signup" onClick={() => setMobileOpen(false)}>Sign up</StyledNavLink>
              </>
            )}
          </NavLinks>
        </NavContainer>
      </NavInner>
    </Nav>
  );
};