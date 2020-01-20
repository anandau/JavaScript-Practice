import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import Error from './ErrorMessage';
import styled from 'styled-components';

// this will allow us to change the title of the document.
import Head from 'next/head';

const SingleItemStyle = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-flow: column;
    min-height: 800px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .details {
      margin: 3rem;
      font-size: 2rem;
      
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            largeImage
            image
        }
    }
`;
class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{
                id: this.props.id
            }}>
                {
                    ({error, loading, data}) => {
                        if(error) return <p><Error error={error}/></p>
                        if(loading) return <p>Loading...</p>
                        if(!data.item) return <p>No Item Found for {this.props.id}</p>
                        return <SingleItemStyle>
                            <Head>
                                <title>Sick Fits | {data.item.title}</title>
                            </Head>
                            <img src={data.item.image} alt={data.item.title}/>
                            <div className="details">
                                <h2>Viewing {data.item.title}</h2>
                                <p>{data.item.description}</p>
                            </div>
                        </SingleItemStyle>
                    }
                }
            </Query>
        );
    }
}

export default SingleItem;