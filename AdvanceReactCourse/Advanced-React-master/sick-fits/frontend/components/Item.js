import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
// right now it is in us money format.
import formalMoney from '../lib/formatMoney';
import DeleteItem from "./DeleteItem";
class Item extends Component {
    render() {
        const { item } = this.props;
        // hre Link href will have our path to go and a query.
        return (
            <ItemStyles>
                {item.image && <img src={item.image} alt={item.title}/>}
                <Title>
                    <Link href={{
                        pathname: '/item',
                        query: {id: item.id},
                    }}>
                        <a>{item.title}</a>
                    </Link>
                </Title>
                <PriceTag>
                    {formalMoney(item.price)}
                </PriceTag>
                <p>{item.description}</p>

                <div className="buttonList">
                    <Link href={{
                        pathname: "update",
                        query: {id: item.id}
                    }}>
                        <a>Edit</a>
                    </Link>
                    <button>Add to Cart</button>
                    <DeleteItem id={item.id}>Delete this Item</DeleteItem>
                </div>
            </ItemStyles>
        );
    }
}

// the prop type will check the type of the data.
// here we are checking that item is object and it is required
Item.propTypes = {
    item: PropTypes.object.isRequired,

};

export default Item;
