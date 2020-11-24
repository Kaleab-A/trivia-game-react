import { combineReducers } from "redux";
import questionsReducer from "./question";
import gameReducer from "./game";

const allReducers = combineReducers({
	getQuestions: questionsReducer,
	gameReducer: gameReducer,
});

export default allReducers;
