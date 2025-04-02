import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Collaborators from "./pages/Collaborators.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import Applications from "./pages/Applications.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="app">
					<Navbar />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/projects/:id" element={<ProjectDetails />} />
							<Route path="/profile/:id" element={<Profile />} />
							<Route path="/collaborators" element={<Collaborators />} />
							<Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/applications" element={<Applications />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
