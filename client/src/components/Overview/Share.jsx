import React from 'react';
import styled from 'styled-components';
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, PinterestIcon,TwitterIcon } from 'react-share';

function Share ({url, quote}) {

  return (

      <ShareContainer id='Share'>
        <ShareIcon>
          <FacebookShareButton url= {url} quote={quote}><FacebookIcon size={40} round /></FacebookShareButton>
        </ShareIcon>

        <ShareIcon>
        <TwitterShareButton url={url} title = {quote}><TwitterIcon size={40} round /></TwitterShareButton>
        </ShareIcon>

        <ShareIcon>
        <PinterestShareButton url={url} media ={url}><PinterestIcon size={40} round /></PinterestShareButton>
        </ShareIcon>
      </ShareContainer>
    );

}
export default Share;

const ShareContainer = styled.div`
  margin: 40px 0px;
  display: flex;
`;

const ShareIcon = styled.div`
  margin-right: 20px;
`;

