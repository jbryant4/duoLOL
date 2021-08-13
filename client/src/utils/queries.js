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

export const QUERY_CHAMPIONS = gql`
	query champions {
		champions{
    		name
    		icon {
      			url
    		}
  		}
	}
`;

