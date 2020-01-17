
// now this custom document is created because when we refresh our page we can see for a little time we have a page without css and after second we have our page with css.
// here in this custom document what this file do is
// it will rendered on the server side.
// it is used to change the initial server side rendered document markup.
// means it will take all our styled-components css before the browser and will return in getInitialProps function.
// and the getInitialProps function will call before the render function call.


import Document, { Head, Main, NextScript } from 'next/document';
// now what ServerStyleSheet will do is it will see if any styled-components is found in the tree then it will first take it for us.
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        return (
            <html>
            <Head>{this.props.styleTags}</Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        );
    }
}
