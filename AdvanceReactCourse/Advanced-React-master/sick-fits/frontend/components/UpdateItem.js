import React, {Component} from 'react';
// thats allow us to push data.
import { Mutation, Query } from "react-apollo";
import Form from './styles/Form';
import formalMoney from '../lib/formatMoney';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';
// here the mutation we are passing mutation to some arguments and getting them in createItem.
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ){
            id
            title
            description
            price
        }
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {}
    handleChange = (event) => {
        const {name, type, value} = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    }
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {
                    ({data, loading})  => {
                        if(loading) return <p>Loading...</p>
                        if(!data.item) return <p>No Item Found! for ID {this.props.id}</p>
                        return (
                            // here we are passing the variables to mutation and getting them in the query.
                            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                                {
                                    (updateItem, {loading, error}) => (

                                        <Form onSubmit={async (e) => {
                                            // stop the form from submitting.
                                            e.preventDefault();
                                            console.log(this.state);
                                            // call the mutation.
                                            const res = await updateItem({
                                                variables: {
                                                    id: this.props.id,
                                                    ...this.state,
                                                }
                                            });
                                            console.log('updated -> ', this.state);
                                        }}>
                                            <ErrorMessage error={error}/>
                                            <fieldset disabled={loading} aria-busy={loading}>
                                                <label htmlFor={"title"}>
                                                    Title
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        placeholder="Title"
                                                        required
                                                        defaultValue={data.item.title}
                                                        onChange={this.handleChange}
                                                    />
                                                </label>

                                                <label htmlFor={"price"}>
                                                    Price
                                                    <input
                                                        type="number"
                                                        id="price"
                                                        name="price"
                                                        placeholder="Price"
                                                        required
                                                        defaultValue={data.item.price}
                                                        onChange={this.handleChange}
                                                    />
                                                </label>

                                                <label htmlFor={"description"}>
                                                    Description
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        placeholder="Description"
                                                        required
                                                        defaultValue={data.item.description}
                                                        onChange={this.handleChange}
                                                    />
                                                </label>

                                                <button type={"submit"}>Sav{loading ? 'ing' : 'e'}</button>
                                            </fieldset>
                                        </Form>
                                    )
                                }
                            </Mutation>
                        )
                    }
                }
            </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };