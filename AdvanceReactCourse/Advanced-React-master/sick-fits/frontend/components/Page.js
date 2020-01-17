import React, {Component} from 'react';
import Header from "./Header";
import Meta from "./Meta";
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

// we are using styled component for styling our app.
// we can have multiple theme.
const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

// in injectGlobal all the given css will be applied on global.
// meaning it will apply on all the tags or whatever.
injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('../static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight: normal;
    font-style: normal;  
  }
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *,*:before,*:after{
    box-sizing: inherit;
  }
  body{
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a{
    text-decoration: none;
    color: ${theme.black};
  }
`;
class Page extends Component {
    render() {
        return (
            /*we are setting theme here and getting it in our styled.*/
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    {/*now this header will be same for all the pages.*/}
                    <Header/>
                    <Inner>
                        {/*<p>Hey i am the Page Component.</p>*/}
                        {/*this.props.children -> will have our index.js or maybe other page like sell.js
                           we are getting this because we wrap our Component with this Page Component in _app.js thats why we are
                           getting all the page in this.props.children.
                         */}
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;