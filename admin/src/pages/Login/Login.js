import styled from "styled-components";
import { mobile } from "../../responsive";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/clothing-shop-47732.appspot.com/o/pexels-pixabay-357514.jpg?alt=media&token=a3b09a91-9f87-4097-84cf-a1689d1a2cfb")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  direction: rtl;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();

    login({ username, password }, dispatch);
  };
  return (
    <Container>
      <Wrapper>
        <Title>כניסה</Title>
        <Form>
          <Input
            placeholder="שם משתמש"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="סיסמה"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleClick} disabled={isLoading}>
            {isLoading ? "טוען ..." : "כניסה"}
          </Button>

          {error && <Error>סיסמה שגויה..</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
