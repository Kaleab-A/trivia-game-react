import React, { Component } from "react";
import { useSelector } from "react-redux";
import Choice from "./Choice";
import { useDispatch } from "react-redux";
import { nextQuestion, setCorrectAnswer, setWrongAnswer } from "../redux/actions";

const Choices = () => {
	const dispatch = useDispatch();
	const questionsRes = useSelector((state) => state.getQuestions);
	const gameData = useSelector((state) => state.gameReducer);

	var choices;
	var choicesList;
	var choicesShuffle = [];
	var alphaMap = new Map();
	alphaMap.set(0, "A");
	alphaMap.set(1, "B");
	alphaMap.set(2, "C");
	alphaMap.set(3, "D");

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const handleClick = (e) => {
		if (e.target.innerHTML == questionsRes.question[questionsRes.currQsID].correct_answer) {
			dispatch(setCorrectAnswer(questionsRes.currQsID));
		} else {
			dispatch(setWrongAnswer(questionsRes.currQsID));
		}
		fetch("http://localhost:3001/gameList/", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				var dataNew;
				const game_id = gameData.id;
				data.forEach((element) => {
					if (element.id == game_id) {
						dataNew = element;
					}
				});
				var playerID;
				var myName = gameData.userName;
				dataNew.players.forEach((element, index) => {
					if (element.name == myName) {
						playerID = index;
					}
				});
				dataNew.players[playerID].correct = questionsRes.correct;
				dataNew.players[playerID].wrong = questionsRes.wrong;
				fetch("http://localhost:3001/gameList/" + game_id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataNew),
				});
			});
		dispatch(nextQuestion());
	};

	if (questionsRes.fetched) {
		choices = [...questionsRes.question[questionsRes.currQsID].incorrect_answers];
		choices.push(questionsRes.question[questionsRes.currQsID].correct_answer);
		shuffleArray(choices);
		choices.forEach((element, index) => {
			choicesShuffle.push({ index: index + 1, value: element });
		});
		choicesList = choicesShuffle.map((choice) => <Choice id={choice.index} name={choice.value} onClick={handleClick} />);
	}

	return (
		<div className="card" id="choicesCard">
			{questionsRes.fetched && (
				<div className="card-body">
					{/* <h5 className="card-title">Choices</h5> */}
					<br></br>
					<span className="card-text">{choicesList}</span>
					{/* <button className="btn btn-primary" id="submitButton" onClick={() => dispatch(nextQuestion())}>
						Submit
					</button> */}
					<br></br>
				</div>
			)}
		</div>
	);
};

export default Choices;
