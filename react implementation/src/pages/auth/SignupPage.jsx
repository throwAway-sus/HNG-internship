import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { PageWrap, Container, Card, Title, Subtle, FormRow, Label, Input, PrimaryButton, FooterWrap } from "../../styles/styledBits";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../hooks/useAuthStore";
import { isAuthenticated } from "../../utils/session";

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
`;

const StyledCard = styled(Card)`
  width: 520px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 6px;
`;

const StyledSubtle = styled(Subtle)`
  margin-bottom: 12px;
`;

const ErrorMessage = styled.div`
  margin-top: 12px;
  color: #dc2626;
  font-size: 13px;
`;

const SubmitRow = styled(FormRow)`
  margin-top: 18px;
`;

const BottomText = styled.p`
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #6b7280;
`;

const BottomLink = styled.a`
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignupPage = () => {
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const res = auth.signup(email.trim(), password);
      if (res.ok) {
        toast.success("Account created");
        navigate("/dashboard");
      } else {
        setError(res.message || "Could not create account");
        toast.error(res.message || "Could not create account");
      }
      setSubmitting(false);
    }, 300);
  };

  return (
    <PageWrap>
      <Navbar />
      <Container px="48px">
        <CenteredWrapper>
          <StyledCard>
            <StyledTitle>Create a new account</StyledTitle>
            <StyledSubtle>Create your account to get started.</StyledSubtle>

            <form onSubmit={handleSubmit}>
              <FormRow>
                <Label>Email address</Label>
                <Input
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </FormRow>

              <FormRow>
                <Label>Password</Label>
                <Input
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </FormRow>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitRow>
                <PrimaryButton type="submit" disabled={submitting} aria-disabled={submitting}>
                  {submitting ? "Please wait..." : "Sign up"}
                </PrimaryButton>
              </SubmitRow>
            </form>

            <BottomText>
              Already have an account? <BottomLink href="/auth/login">Sign in</BottomLink>
            </BottomText>
          </StyledCard>
        </CenteredWrapper>
      </Container>

      <FooterWrap>© {new Date().getFullYear()} Ticketi•fy — © UnSiMplYkells</FooterWrap>
    </PageWrap>
  );
};
