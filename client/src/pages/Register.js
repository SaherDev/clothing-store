import styled from "styled-components";
import { mobile } from "../responsive";

import { useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  direction: rtl;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/clothing-shop-47732.appspot.com/o/pexels-ron-lach-9594679.jpg?alt=media&token=0f9fd305-682d-4b38-962e-f7c34ee26827")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  padding: 0 8px;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  padding: 0 8px;
  font-size: 12px;
  margin: 20px 0px;
  margin-right: 8px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-right: 8px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  padding-top: 25px;
  padding-right: 10px;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isFetching, setisFetching] = useState(false);
  const [error, setError] = useState({});

  const handleClick = (e) => {
    e.preventDefault();

    const register = async () => {
      setError(false);
      setisFetching(true);

      try {
        await publicRequest.post("auth/register", {
          username,
          email,
          password,
        });
        window.location.reload(false);
      } catch (err) {
        setError(err);
      }

      setisFetching(false);
    };

    register();
  };

  return (
    <Container>
      <Wrapper>
        <Title>יצירת חשבון</Title>
        <Form>
          <Input
            placeholder="שם משתמש"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="אימייל"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="סיסמה"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input placeholder="אשר סיסמה" type="password" />
          <Agreement>
            על ידי יצירת חשבון, אני מסכים לעיבוד האישי שלי נתונים בהתאם ל
            <b>מדיניות הפרטיות</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            יצירת חשבון
          </Button>
          {error && <Error>משהו השתבש ..</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};
export default Register;
