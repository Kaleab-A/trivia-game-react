// const initialState = { gameList: [{ gameID: "akdm23e3kmqw", players: ["abebe", "bruick", "kaleab", "leo"], host: "kaleab" }] };
//  Add the questions, correctQuestion, Wrong Question

const initialState = { id: null, gameID: null, userName: "", disabled: true };
const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_ID":
			return { ...state, id: action.id };
		case "SET_GAME_ID":
			return { ...state, gameID: action.gameid };
		case "SET_NAME":
			return { ...state, userName: action.name };
		case "SWITCH_JOIN_BUTTON":
			return { ...state, disabled: action.value };
		default:
			return state;
	}
};

export default gameReducer;
