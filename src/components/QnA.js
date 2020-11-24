import React, { Component } from "react";
import Question from "./Question";
import Choices from "./Choices";
import brain from "../Images/brainWork.gif";
import { useSelector } from "react-redux";
import { Roll } from "react-awesome-reveal";
import LeaderBoard from "./Leaderboard";

const QnA = () => {
	const fetchedRes = useSelector((state) => state.getQuestions);
	console.log("jacg", fetchedRes);
	var show = (
		<div className="row no-gutters">
			<img src={brain} id="brain" style={{ opacity: 0.2 }} />
			<div className="col-6">
				<div id="questionDiv">
					<Question />
				</div>
			</div>
			<div className="col-6">
				<div id="choicesDiv">
					<Choices />
				</div>
			</div>
		</div>
	);

	if (fetchedRes.currQsID == 10) {
		show = <LeaderBoard />;
	}
	return <React.Fragment>{show}</React.Fragment>;
};

export default QnA;
