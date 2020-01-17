import React, {Component} from 'react';
// thats allow us to push data.
import { Mutation} from "react-apollo";
import Form from './styles/Form';
import formalMoney from '../lib/formatMoney';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';
// here the mutation we are passing mutation to some arguments and getting them in createItem.
const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ){
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'cool shoes',
        description: 'i love this shoes',
        image: 'dog.jpg',
        largeImage: 'large-dog.jpg',
        price: 100,
    }
    handleChange = (event) => {
        const {name, type, value} = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    }
    // this function will upload our image to cloudinary.com.
    uploadFile = async (event) => {
        console.log('uploading file');
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // give the name which we have given in cloudinary.com under upload setting.
        // in our case it is "sickfits".
        data.append('upload_preset', 'sickfits');

        const endpoint = "https://api.cloudinary.com/v1_1/webtechstreet/image/upload";
        const res = await fetch(endpoint,{
            method: 'POST',
            body: data
        });

        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    }
    render() {
        return (
            // here we are passing the variables to mutation and getting them in the query.
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {
                    (createItem, {loading, error}) => (

                        <Form onSubmit={async (e) => {
                            // stop the form from submitting.
                            e.preventDefault();
                            console.log(this.state);
                            // call the mutation.
                            const res = await createItem();
                            // change them to single item page
                            Router.push({
                                pathname: '/item',
                                query: {id: res.data.createItem.id},
                            })
                        }}>
                           <ErrorMessage error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>

                                <label htmlFor={"file"}>
                                    Image
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload an image"
                                    required
                                    onChange={this.uploadFile}
                                />
                                    {this.state.image && <img src={this.state.image} alt={"Upload Preview"} width={200}/>}
                                </label>

                                <label htmlFor={"title"}>
                                    Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    required
                                    value={this.state.title}
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
                                    value={this.state.price}
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
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                                </label>

                                <button type={"submit"}>Submit</button>
                            </fieldset>
                        </Form>
                    )
                }
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };