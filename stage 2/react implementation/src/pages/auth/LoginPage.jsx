import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../hooks/useAuthStore";
import { isAuthenticated } from "../../utils/session";

const PageContainer = styled.div``;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
`;

const StyledCard = styled.div`
  width: 520px;
  padding: 32px;
  background: ${(p) => p.theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h1`
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledSubtle = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  color: ${(p) => p.theme.colors.subtleText || "#6b7280"};
`;

const Form = styled.form``;

const StyledFormRow = styled.div`
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid ${(p) => p.theme.colors.border || "#d1d5db"};
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: ${(p) => p.theme.colors.primary || "#2563eb"};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const ErrorMessage = styled.div`
  margin-top: 12px;
  color: #dc2626;
  font-size: 13px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: ${(p) => p.theme.colors.primary || "#2563eb"};
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SignUpText = styled.p`
  margin: 0;
  margin-top: 12px;
  font-size: 13px;
  color: ${(p) => p.theme.colors.subtleText || "#6b7280"};
`;

const SignUpLink = styled.a`
  color: ${(p) => p.theme.colors.primary || "#2563eb"};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 32px;
  font-size: 13px;
  color: ${(p) => p.theme.colors.subtleText || "#6b7280"};
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate("/dashboard", { replace: true });
  }, [navigate]);

  const validateEmail = (em) => /\S+@\S+\.\S+/.test(em);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const res = auth.login(email.trim(), password);
      if (res.ok) {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        setError(res.message || "Invalid credentials");
        toast.error(res.message || "Invalid credentials");
      }
      setSubmitting(false);
    }, 300);
  };

  return (
    <PageContainer>
      <Navbar />
      <CenterContainer>
        <StyledCard>
          <StyledTitle>Sign in to your account</StyledTitle>
          <StyledSubtle>Welcome back — sign in.</StyledSubtle>

          <Form onSubmit={handleSubmit}>
            <StyledFormRow>
              <StyledLabel htmlFor="email">Email address</StyledLabel>
              <StyledInput
                id="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </StyledFormRow>

            <StyledFormRow>
              <StyledLabel htmlFor="password">Password</StyledLabel>
              <StyledInput
                id="password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </StyledFormRow>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <StyledFormRow>
              <StyledButton type="submit" disabled={submitting} aria-disabled={submitting}>
                {submitting ? "Please wait..." : "Sign in"}
              </StyledButton>
            </StyledFormRow>
          </Form>

          <SignUpText>
            Don't have an account? <SignUpLink href="/auth/signup">Sign up</SignUpLink>
          </SignUpText>
        </StyledCard>
      </CenterContainer>

      <Footer>© {new Date().getFullYear()} Ticketi•fy — © UnSiMplYkells</Footer>
    </PageContainer>
  );
};