import React, { Component } from "react";
import { Link } from "react-router-dom";

const Retry = () => {
	return (
		<Link to={""}>
			<button href="#" class="btn btn-primary" style={{ width: 100 }}>
				Retry
			</button>
		</Link>
	);
};

export default Retry;
