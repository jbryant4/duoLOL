import React from "react";

const SearchBar = ({ keyword, setKeyword }) => {
	const BarStyling = {
		width: "80%",
		background: "(#F2F1F9)",
		border: "none",
		borderRadius: "5px",
		padding: "0.5rem",
		margin: "1rem",
	};
	return (
		<input
			style={BarStyling}
			key="random1"
			value={keyword}
			placeholder={"Search..."}
			onChange={(e) => setKeyword(e.target.value)}
		/>
	);
};

export default SearchBar;
