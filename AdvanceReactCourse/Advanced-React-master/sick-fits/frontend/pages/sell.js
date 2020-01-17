// we dont have to import the react because next.js will take care of that.

//import React from 'react';

// just go to http://localhost:7777/Sell and we will see the sell page.
// we dont have to do anything like routing etc.
import CreateItem from "../components/CreateItem";

const Sell = props => (
    <div>
        <CreateItem/>
    </div>
)
export default Sell;