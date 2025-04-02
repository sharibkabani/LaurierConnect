import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in on mount
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setIsLoggedIn(true);
			setUserId(storedUserId);
		}
		setLoading(false);
	}, []);

	const login = (userId) => {
		localStorage.setItem("userId", userId);
		setIsLoggedIn(true);
		setUserId(userId);
	};

	const logout = () => {
		localStorage.removeItem("userId");
		setIsLoggedIn(false);
		setUserId(null);
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, userId, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
