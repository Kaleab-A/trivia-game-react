export const fetching = () => ({
	type: "FETCHING",
});

export const fetchStart = (data) => ({
	type: "FETCHING_SUCCESS",
	payload: data,
});

export const nextQuestion = () => ({
	type: "NEXT_QUESTION",
});

// export const newGame = (name) => ({
// 	type: "NEW_GAME",
// 	payload: name,
// });

export const setID = (id1) => ({
	type: "SET_ID",
	id: id1,
});

export const setGameID = (game_id) => ({
	type: "SET_GAME_ID",
	gameid: game_id,
});

export const setCorrectAnswer = (quesID) => ({
	type: "CORRECT_ANSWER",
	questionID: quesID,
});

export const setWrongAnswer = (quesID) => ({
	type: "WRONG_ANSWER",
	questionID: quesID,
});

export const setName = (userName) => ({
	type: "SET_NAME",
	name: userName,
});

export const disableJoinButton = (value) => ({
	type: "SWITCH_JOIN_BUTTON",
	value: value,
});
