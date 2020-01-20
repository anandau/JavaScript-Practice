// we dont have to import the react because next.js will take care of that.

//import React from 'react';


import SingleItem from "../components/SingleItem";
const Item = props => (
    <div>
        <SingleItem id={props.query.id}/>
    </div>
)

export default Item;