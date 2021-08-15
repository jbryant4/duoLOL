import { gql } from "@apollo/client";

// Sign Up
export const ADD_USER = gql`
	mutation addUser($content: userInfo!) {
		addUser(content: $content) {
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



