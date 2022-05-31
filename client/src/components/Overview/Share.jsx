import React from 'react';
import styled from 'styled-components';
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, PinterestIcon,TwitterIcon } from 'react-share';

function Share ({url, quote}) {

  return (

      <ShareContainer id='Share'>
        <FacebookShareButton
          url= {url}
          quote={quote}
          id="share">
          <FacebookIcon size={40} round /></FacebookShareButton>

        <TwitterShareButton
          url={url}
          title = {quote} id='share'>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <PinterestShareButton
          url={url}
          media ={url}
          id='share'>
          <PinterestIcon size={40} round />
        </PinterestShareButton>
      </ShareContainer>
    );

}
export default Share;

const ShareContainer = styled.div`
  margin: 20px 0px;
`;
