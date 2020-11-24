import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion } from "../redux/actions";
import DotProgress from "./DotProgress";
import { JackInTheBox } from "react-awesome-reveal";
import { useLoading, Puff } from "@agney/react-loading";

const Question = () => {
	const questionsResult = useSelector((state) => state.getQuestions);
	const dispatch = useDispatch();
	const { containerProps, indicatorEl } = useLoading({
		loading: true,
		indicator: <Puff width="100" />,
	});

	const previewQuestion = () => {
		if (questionsResult.fetched) {
			return (
				<JackInTheBox>
					<span className="question">
						<td dangerouslySetInnerHTML={{ __html: questionsResult.question[questionsResult.currQsID].question }} />
					</span>
				</JackInTheBox>
			);
		} else {
			return <div id="Loading">{indicatorEl}</div>;
		}
	};

	return (
		<div className="card " id="questionCard">
			<div className="card-body">
				<h5 className="card-title">
					<DotProgress />
				</h5>
				<span>{previewQuestion()}</span>
			</div>
		</div>
	);
};

export default Question;
