import React, { Component, useState } from "react";
import { Roll } from "react-awesome-reveal";

const Choice = (props) => {
	const [bgColor, setBgColor] = useState("#79b6c7");

	const handleHoverIn = (e) => {
		var numberCircle = document.getElementById("b" + e.target.id[1]);
		numberCircle.style.backgroundColor = "#004D80";
	};

	const handleHoverOut = (e) => {
		var numberCircle = document.getElementById("b" + e.target.id[1]);
		numberCircle.style.backgroundColor = "#79b6c7";
	};

	const handleClick = (e) => {
		var numberCircle = document.getElementById("b" + e.target.id[1]);
		numberCircle.style.backgroundColor = "#79b6c7";
	};

	return (
		<React.Fragment>
			<Roll>
				<button
					id={"a" + props.id}
					className="row py-2 choiceButton"
					onMouseEnter={handleHoverIn}
					onMouseLeave={handleHoverOut}
					onClick={props.onClick}
				>
					<div id={"b" + props.id} className="numberCircle" style={{ backgroundColor: bgColor, boxShadow: "4px 4px 10px" + bgColor }}>
						{props.id}
					</div>
					<div id={"c" + props.id} className="choiceName" dangerouslySetInnerHTML={{ __html: props.name }} />
				</button>
			</Roll>
		</React.Fragment>
	);
};

export default Choice;
