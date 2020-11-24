//  Add the questions, correctQuestion, Wrong Question
import React, { Component, useState, useEffect } from "react";
import worldIcon from "../Images/world.png";
import { Link } from "react-router-dom";
import { setID, setGameID, setName, disableJoinButton } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const JoinGame = (props) => {
	const dispatch = useDispatch();
	const [game_id, setGameID1] = useState(null);
	const [exist, setExist] = useState(false);
	const userName = props.name;
	const gameResult = useSelector((state) => state.gameReducer);
	const values = { id: 1, image: worldIcon, name: "PRIVATE", buttonName: "Join Game", to: "/quiz" };

	const handleChange = (e) => {
		fetch("http://localhost:3001/gameList/", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setExist(false);
				var dataFilted = data.filter((game) => game.gameID == e.target.value);
				if (dataFilted.length == 0) dispatch(disableJoinButton(true));
				else {
					dispatch(disableJoinButton(false));
					setGameID1(e.target.value);
					// 	let dataFilted1 = dataFilted[0].players.filter((player) => player.name == userName);
					// 	if (dataFilted1.length == 0) dispatch(disableJoinButton(false));
					// 	else dispatch(disableJoinButton(true));
				}
			});
	};
	const handleClick = () => {
		dispatch(setName(userName));
		console.log("uuuuuuuuuuuuuu", userName);
		fetch("http://localhost:3001/gameList/", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				var myData;
				data.forEach((element) => {
					console.log("ggggggggggm ", game_id, element.gameID, element.gameID == game_id);
					if (element.gameID == game_id) {
						myData = element;
					}
				});
				console.log("*********", myData);
				dispatch(setID(myData.id));
				var dataNew = myData;
				console.log("youtube", dataNew, game_id, dataNew[game_id]);
				dataNew.players.push({ name: userName, correct: [], wrong: [] });
				fetch("http://localhost:3001/gameList/" + myData.id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(dataNew),
				});
			});
	};

	return (
		<div class="home-option container py-2">
			<div className="row d-flex justify-content-around" style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: 20 }}>
				<div className="col-2">
					<img src={values.image} style={{ width: 120, borderRadius: 100, boxShadow: "0px  0px 2px #D9D9D9", padding: "0.5em 0.6em" }} />
				</div>
				<div className="col-8" id="homeOptions">
					<div className="row">
						<h1 id="joinText">{values.name}</h1>
					</div>
					<div className="row">
						<div className="col-6" style={{ paddingRight: 0 }}>
							<input class="form-control nameInput" placeholder="Enter Code" onChange={handleChange} style={{ width: "100%" }} />
						</div>
						<div className="col-6">
							<Link to={values.to}>
								<button class="btn btn-primary" onClick={handleClick} disabled={gameResult.disabled}>
									{values.buttonName}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JoinGame;
