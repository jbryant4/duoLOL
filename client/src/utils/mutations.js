import { gql } from "@apollo/client";

// Sign Up
export const ADD_USER = gql`
	mutation addUser( $email: String!,$sumName: String!, $password: String!, $primRoles: [String!]) {
		addUser( email: $email , sumName: $sumName, password: $password, primeRoles: $roles) {
			token
			user {
				_id
			}
		}
	}
`;

// Login
export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

// Add a Build
export const ADD_BUILD = gql`
	mutation addBuild($content:buildInfo!) {
		addBuild(content: $content) {
			_id
			builtBy
		}
	}
`;

