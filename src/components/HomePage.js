import React, { Component, useState } from "react";
import { useDispatch } from "react-redux";
import { setID, setGameID, setName } from "../redux/actions";
import HomePageOption from "./HomePageOption";
import gameIcon from "../Images/game.png";
import JoinGame from "./Join";
import creditIcon from "../Images/credit.png";
import { Modal, Button } from "react-bootstrap";

const HomePage = () => {
	function makeid(length) {
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
		return result;
	}

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [userName, setUserName] = useState("");
	const dispatch = useDispatch();

	const handleChange = (e) => setUserName(e.target.value);
	const handleClick = () => {
		dispatch(setName(userName));
		fetch("http://localhost:3001/gameList/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				gameID: makeid(10),
				players: [{ name: userName, correct: [], wrong: [] }],
				host: userName,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data, data.id, data.gameID);
				dispatch(setID(data.id));
				dispatch(setGameID(data.gameID));
			});
	};

	const options = [
		{ id: 0, image: gameIcon, name: "HOST", buttonName: "Create a Game", to: "/quiz", do: handleClick },
		{ id: 2, image: creditIcon, name: "CREDITS", buttonName: "About TRIVUIZ", do: handleShow },
	];

	return (
		<div id="homePageMain">
			<div id="homePage">
				<br />
				<h1 id="homeTitle">Trivuiz</h1>
				<div class="form-group" className="nameForm">
					<input class="form-control nameInput" aria-describedby="emailHelp" placeholder="Enter name" onChange={handleChange} />
				</div>
				<br />
				{options.map((option) =>
					option.id == 0 ? (
						<div>
							<HomePageOption
								id={option.id}
								image={option.image}
								name={option.name}
								buttonName={option.buttonName}
								to={option.to}
								do={option.do}
							></HomePageOption>
							<JoinGame name={userName} />
						</div>
					) : (
						<HomePageOption
							id={option.id}
							image={option.image}
							name={option.name}
							buttonName={option.buttonName}
							to={option.to}
							do={option.do}
						></HomePageOption>
					)
				)}
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>About TRIVUIZ</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h6>This is a Trivia Game made for multiplayer. </h6>
					<br />
					<p>Made by Kaleab Asfaw</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default HomePage;
