import Header from "./components/Header";
import Statements from "./components/Statements";
import CursorFollower from "./components/MouseFollower";

export default function App() {
	return (
		<div>
			<Header />
			<main>
				<Statements />
			</main>
			<CursorFollower />
		</div>
	);
}