import React, { Component } from "react";
import Dot from "./Dots";
import { useSelector } from "react-redux";

const DotProgress = () => {
	const questions = useSelector((state) => state.getQuestions);
	const doList = Array(10).fill(null);
	var dots = doList.map((value, index) => {
		if (index == questions.currQsID) return <Dot active />;
		return <Dot />;
	});
	return <div style={{ display: "flex" }}>{dots}</div>;
};

export default DotProgress;
