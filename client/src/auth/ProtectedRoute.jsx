import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

export const ProtectedRoute = () => {
	const { isLoggedIn, isLoading } = useAuth();
	// return default template while performing async auth task
	console.log(isLoggedIn);
	if (isLoading) return <div>Loading...</div>;
	return isLoggedIn ? (
		// if logged in, return the Outlet
		<Outlet />
	) : (
		// if not logged in redirect to signin
		<Navigate to="/signin" />
	);
};
