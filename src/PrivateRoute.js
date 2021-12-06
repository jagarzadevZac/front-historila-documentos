import React from "react";
import { Redirect, Route } from "react-router";
import useAuthentication from "./hooks/useAuthentication";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useAuthentication();
	console.log('rest props ', rest);
    return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated() === true) {
					return <Component {...props} {...rest}/>;
				} else {
					return <Redirect to="/" />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
