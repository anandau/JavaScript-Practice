// the _app.js is the custom app for next.js
// everything we put in this page will persist in our whole app.
/*
Persisting layout between page changes -> like header of the app etc. like the header of the app will be same for all the page so it will keep everything for us.
Keeping state when navigating pages
Inject additional data into pages (for example by processing GraphQL queries)
*/

import App, {Container} from "next/app";
import Page from "../components/Page";
import { ApolloProvider} from "react-apollo";
// the withData is a High Order Component.
import withData from "../lib/withData";

// so in order to expose apollo client just wrap the app with AplloProvider.

class MyApp extends App{
    // the getInitialProps is a static function provided by next.js
    // it is called before the render is called so that we can have everything which we want initially.
    // like list of item, cart, etc all those query need to be fired of and resolved so that we can render out our page.
    // here this function is used to create pagination.
    // this is not necessary to do that if we are having a "Client Rendered App."
    // but necessary when having "Server Rendered App" because thats how it works.
    static async getInitialProps({Component, ctx}){
        let pageProps = {};
        // if the component which we trying to render has getInitialProps than we are going the surface the page props.
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user.
        pageProps.query = ctx.query;

        return { pageProps };
    }
    render() {
        // in this Component we will get our page like index.js and sell.js
        // the pageProps is coming from getInitialProps since it is called before the render so we can access it here.
        const { Component, apollo, pageProps } = this.props;
        //console.log(Component);
        // this.props.apollo with have our client.
        // but how ?
        // because we will wrap MyApp with withData.
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        {/*we will spread pageProps for each specific page.*/}
                        <Component {...pageProps}/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

// withData will allows us to get apollo client using this.props.apollo.
export default withData(MyApp);
