// the Meta.js will have everything related to html meta tags
// any external css which we want to import etc.
// like title,head,meta,link etc.

// to update the head using next.js
import Head from 'next/head';

const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>Sick Fits!</title>
    </Head>
)

export default Meta;