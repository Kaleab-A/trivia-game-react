import React, { useState, useEffect } from "react";
import "./App.css";
import QnA from "./components/QnA";
import HomePage from "./components/HomePage";
import "./components/style.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { fetching, fetchStart, newGame } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(fetching());
			fetch("https://opentdb.com/api.php?amount=50")
				.then((response) => response.json())
				.then((data) => {
					data = data["results"];
					data = data.filter((ques) => ques.correct_answer.length <= 21);
					data = data.slice(0, 10);
					dispatch(fetchStart(data));
				});
		};
		fetchData();
	}, []);

	return (
		<Router>
			{/* <QnA /> */}
			<Route path="/" exact component={HomePage} />
			<Route path="/quiz" exact component={QnA} />
		</Router>
	);
}

export default App;
