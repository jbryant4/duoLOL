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

export const QUERY_BUILD_ITEMS = gql`
	query buildItems {
  		buildItems{
    		boots {
      			name
      			icon{
        			url
      			}
      			description
    		}
    		mythics {
      			name
      			icon{
        			url
      			}
      			description
    		}
    	legendaries{
      		name
      		icon{
      			url
      		}
      		description
    	}
  }
}
`;

export const QUERY_ME = gql`
	query me {
  		me{
			_id
			email
			rank
			tier
			wins
			losses
			sumName
			primRoles
			riotId
			puuid
			friendCount
			builds{
				_id
				title
				champion
				boots
				mythic
				legendaries
			}
			friends{
				_id
				sumName
			}
		}
	}
`;