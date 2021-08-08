import { gql } from "@apollo/client";

export const QUERY__ALL_SOMETHING = gql`
	{
		something {
			_id
			name
			description
		}
	}
`;

