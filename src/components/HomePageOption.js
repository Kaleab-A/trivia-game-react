import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

const HomePageOption = (props) => {


	return (
		<div className="home-option container py-2">
			<div className="row d-flex justify-content-around" style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: 20 }}>
				<div className="col-2 px-2">
					<img src={props.image} style={{ width: 120, borderRadius: 100, boxShadow: "0px  0px 2px #D9D9D9", padding: "0.5em 0.6em" }} />
				</div>
				<div className="col-6 px-2">
					<div id="homeOptions">
						<h1 className="homePageText">{props.name}</h1>
						<Link to={props.to}>
							<button class="btn btn-primary" onClick={props.do}>
								{props.buttonName}
							</button>
						</Link>
					</div>
				</div>
			</div>
			

			
		</div>
	);
};

export default HomePageOption;
