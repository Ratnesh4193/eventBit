import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/Login/accountBox/index";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <div class="loginPage">
        <AppContainer>
          <div class="loginContainer">
            <AccountBox />
          </div>
        </AppContainer>
      </div>
    </>
  );
}

export default App;
