import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 400,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SimpleSelect() {
	const classes = useStyles();
	const [champion, setChampion] = React.useState("");

	const handleChange = (event) => {
		setChampion(event.target.value);
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">
					Select Your Champion
				</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={champion}
					onChange={handleChange}
					label="champion"
				>
					<MenuItem value="">
						<em>Select One</em>
					</MenuItem>
					<MenuItem value={10}>AATROX</MenuItem>
					<MenuItem value={20}>AHRI</MenuItem>
					<MenuItem value={30}>JAX</MenuItem>
					<MenuItem value={30}>JHIN</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
