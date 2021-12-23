import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/Login/accountBox/index";
import Navbar from "./Navbar.jsx";

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
			<div class='loginPage'>
				<AppContainer>
					<Navbar />
					<div class='loginContainer'>
						<AccountBox />
					</div>
				</AppContainer>
			</div>
		</>
	);
}

export default App;
