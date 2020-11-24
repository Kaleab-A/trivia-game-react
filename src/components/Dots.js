import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Dot = (props) => {
	var dotColor = "#68AABE";
	if (props.active) dotColor = "#A6DBEB";
	return (
		<div className="px-2">
			<FontAwesomeIcon icon={faCircle} color={dotColor} />
		</div>
	);
};

export default Dot;
