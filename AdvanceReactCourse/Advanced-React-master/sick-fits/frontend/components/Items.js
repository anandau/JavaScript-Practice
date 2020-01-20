import React, {Component} from 'react';
// allows us to query db.
import { Query } from 'react-apollo';
// gql will help us to write query.
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from "./Pagination";
const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title 
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
  text-align: center
`;

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination></Pagination>
                <Query query={ALL_ITEMS_QUERY}>
                    {
                        /*
                        method 1 -> here in payload we will have our all the data and information
                        (payload) => {
                            console.log(payload);
                            return <p>hey i am the child of Query</p>
                        }*/
                        /*method 2 -> here we destructure the payload into its variable.*/
                        ({data, error, loading}) => {
                            if (loading) return <p>Loading...</p>
                            if (error) return <p>Error: {error.message}</p>
                            return <ItemsList>
                                    {
                                        data.items.map(item =>
                                            <Item item={item} key={item.id}/>
                                        )
                                    }
                                    </ItemsList>
                        }
                    }
                </Query>
                <Pagination></Pagination>
            </Center>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY };