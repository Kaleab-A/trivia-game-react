import React, { Component } from "react";
import { Link } from "react-router-dom";

const Retry = () => {
	const handleClick = () => {
		console.log("clask");
	};

	return (
		<Link to={""}>
			<button href="#" class="btn btn-primary" onClick={handleClick} style={{ width: 100 }}>
				Retry
			</button>
		</Link>
	);
};

export default Retry;
