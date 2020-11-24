import React, { Component, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WrongQuestons from "./WrongQuestions";
import Retry from "./Retry";

const LeaderBoard = () => {
	const questions = useSelector((state) => state.getQuestions);
	const gameResult = useSelector((state) => state.gameReducer);
	const [gameData, setGameData] = useState(null);
	useEffect(() => {
		const fetchData = async () =>
			fetch("http://localhost:3001/gameList/", {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("looooooll", data);
					data.forEach((element) => {
						if (element.id == gameResult.id) {
							setGameData(element);
							console.log("Huuuuray", element);
						}
					});
				});

		fetchData();
	}, []);

	function sortFunction(a, b) {
		if (a[1] === b[1]) {
			return 0;
		} else {
			return a[1] < b[1] ? 1 : -1;
		}
	}

	var ranking;
	if (gameData) {
		var playerData;
		console.log("000a000", questions, gameData.players);
		var scoreList = [];
		gameData.players.forEach((element) => {
			scoreList.push([element.name, element.correct.length]);
			console.log("=========", element);
		});
		scoreList = scoreList.sort(sortFunction);
		scoreList.forEach((element, index) => {
			element.push(index + 1);
		});
		console.log("ssssssssssssssssssssssss", scoreList);
		let myScore = scoreList.filter((x) => x[0] == gameResult.userName)[0];
		console.log("----------->", scoreList, myScore);
		scoreList.unshift([gameResult.userName, myScore[1], myScore[2]]);
		ranking = (
			<table class="tableStyle">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{scoreList.map((ele) => (
						<tr>
							<td>{ele[2]}</td>
							<td>{ele[0]}</td>
							<td>{ele[1]}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	return (
		<React.Fragment>
			<div class="card" id="boardCard">
				<div class="card-body" style={{ textAlign: "center" }}>
					<h1 class="card-title">LeaderBoard</h1>
					<div class="card-text">
						<div className="row">
							<div className="col-7">{ranking}</div>
							<div className="col-5">
								<WrongQuestons />
							</div>
						</div>
					</div>
					<Retry />
				</div>
			</div>
		</React.Fragment>
	);
};

export default LeaderBoard;
