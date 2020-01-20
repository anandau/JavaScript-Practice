// we dont have to import the react because next.js will take care of that.

//import React from 'react';

// just go to http://localhost:7777/updateItem and we will see the update page.
// we dont have to do anything like routing etc.

import UpdateItem from "../components/UpdateItem";

const update = props => (
    <div>
        <UpdateItem id={props.query.id}/>
    </div>
)
export default update;