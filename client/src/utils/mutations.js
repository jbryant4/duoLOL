import { gql } from "@apollo/client";

// Sign Up
export const ADD_USER = gql`
	mutation addUser( $email: String!,$sumName: String!, $password: String!) {
		addUser( email: $email , sumName: $sumName, password: $password) {
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



