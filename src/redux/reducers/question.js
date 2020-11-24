const initialState = { fetching: false, fetched: false, currQsID: 0, correct: [], wrong: [] };
const questionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCHING":
			return { ...state, fetching: true };
		case "FETCHING_SUCCESS":
			return { ...state, fetching: false, fetched: true, question: action.payload };
		case "NEXT_QUESTION":
			return { ...state, currQsID: state.currQsID + 1 };
		case "CORRECT_ANSWER":
			var correctNew = state.correct;
			correctNew.push(action.questionID);
			return { ...state, correct: correctNew };
		case "WRONG_ANSWER":
			var wrongNew = state.wrong;
			wrongNew.push(action.questionID);
			return { ...state, wrong: wrongNew };
		default:
			return state;
	}
};

export default questionsReducer;
