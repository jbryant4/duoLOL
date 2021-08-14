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

export const QUERY_CHAMPION = gql`
	query champion($name: String!) {
  		champion(name: $name){
    		name
			images {
				name
				url
			}
    		title
    		lore
    		tags
    		allytips
    		enemytips
    		passive {
      			name
      			description
      			icon{
        			url
      			}
    		}
    		abilities {
      			name
      			description
      			icon{
        			url
      			}
    		}
  		}
}
`;

