import React, { Component, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip";

const WrongQuestions = () => {
	useEffect(() => {
		const fetchData = async () =>
			fetch("http://localhost:3001/gameList/", {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => {
					data.forEach((element) => {
						if (element.id == gameResult.id) {
							setGameData(element);
						}
					});
				});

		fetchData();
	}, []);

	const questions = useSelector((state) => state.getQuestions);
	const gameResult = useSelector((state) => state.gameReducer);
	var wrongQuestions;
	const [gameData, setGameData] = useState(null);
	const [isFlipped, flip] = useState(false);
	const handleClick = (e) => {
		flip(!isFlipped);
	};

	const returnValue = (id) => {
		return (
			'<br><button class="btn btn-info"  type="button" data-toggle="collapse" data-target="#question' +
			id +
			'" aria-expanded="false" ">Show Answer</button>'
		);
	};

	var playerData;
	if (gameData) {
		gameData.players.forEach((element) => {
			if (element.name == gameResult.userName) {
				playerData = element;
			}
		});
		wrongQuestions = (
			<div class="card" style={{ width: 400, marginTop: 25, textAlign: "center", backgroundColor: "#F67F3B" }}>
				<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
					<div>
						<div class="card-body">
							<h2 class="card-title">Congragulations, {gameResult.userName}</h2>
							<br />
							<div class="card-text badge badge-primary" style={{ width: "auto", fontSize: 40 }}>
								Score: {playerData.correct.length}
							</div>
							<br />
							<br />
							<button className="btn btn-primary" onClick={handleClick}>
								See Incorrect Answer
							</button>
						</div>
					</div>

					<div>
						<div class="card-body" style={{ backgroundColor: "white" }} id="wrongCard">
							<h5 class="card-title">LeaderBoard</h5>
							<p class="card-text">
								<ul className="list-group">
									{playerData.wrong.map((id) => (
										<div style={{ backgroundColor: "#FFEEBA" }}>
											<li
												style={{ background: "transparent", textAlign: "left" }}
												className="list-group-item"
												dangerouslySetInnerHTML={{
													__html: questions.question[id].question + returnValue(id),
												}}
											></li>
											<div className="collapse" id={"question" + id}>
												<li className="list-group-item">{questions.question[id].correct_answer}</li>
											</div>
										</div>
									))}
								</ul>
							</p>
							<button className="btn btn-primary" onClick={handleClick}>
								See Score
							</button>
						</div>
					</div>
				</ReactCardFlip>
			</div>
		);
	}

	return <React.Fragment>{wrongQuestions}</React.Fragment>;
};

export default WrongQuestions;
