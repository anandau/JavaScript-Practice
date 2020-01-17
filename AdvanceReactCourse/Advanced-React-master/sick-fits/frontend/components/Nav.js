import Link from 'next/link'
import NavStyle from './styles/NavStyles'
const Nav = () => (
    <NavStyle>
        {/*The Link from next.js will link the page and will take us to sell.js or anything without refreshing
        the page so that we can maintain our cache or anything which we stored on page.
        if we refresh the page then we will lose our data and will have to get back it from db or anything.*/}
        <Link href={"/"}>
            <a>Shop</a>
        </Link>
        <Link href={"/sell"}>
            <a>Sell</a>
        </Link>
        <Link href={"/signup"}>
            <a>Signup</a>
        </Link>
        <Link href={"/orders"}>
            <a>Orders</a>
        </Link>
        <Link href={"/me"}>
            <a>Account</a>
        </Link>
    </NavStyle>
);

export default Nav;