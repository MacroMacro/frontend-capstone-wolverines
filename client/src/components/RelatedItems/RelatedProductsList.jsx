import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductCard from './RelatedProductCard.jsx';
import styled from 'styled-components';

function RelatedProductList ({productID, relatedProducts, updateProduct}) {
  const [parentProductIDInfo, setParent] = useState('');
  const [imagesToTheLeft, setLeftImage] = useState(false);
  const [imagesToTheRight, setRightImage] = useState(true);
  const [cardOverflow, setOverflow] = useState(false);

  const onLoad = ()=> {
    axios.get(`/product/?id=${productID}`)
    .then((data)=> {
      return data.data
    })
    .then((info) => {
      setParent(info)})
    .catch((error) => {
      console.log('Error fetching product details in relatedProductsList', error);
    });
  }

  useEffect(onLoad, [productID]);

  function scrollLeft() {
    // can scroll left if there are images to the right
    setRightImage(true)
    // find cards given ID productCarousel
    const carousel = document.getElementById('productCarousel');

    // when clicked, scrolls to left by -500
    carousel.scrollLeft -= 500;

    // if scrolled all the way to the left, there are no more images to the left
    if (carousel.scrollLeft <= 500) {
      setLeftImage(false)
    }
  }

  function scrollRight() {
    // can scroll right if there are images to the left
    setLeftImage(true)

    // find carousel div
    const carousel = document.getElementById('productCarousel');
    // see how much room there is left to scroll over
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;

    // when clicked, moves right by 500
    carousel.scrollLeft += 500;

    // if scrolled all the way to the right, no images on the right will exist
    if (carousel.scrollLeft >= amountLeftToScroll - 500) {
      setRightImage(false)
    }
  }

  function overflow() {
    // find carousel div
    const carousel = document.getElementById('productCarousel');

    //if scrollWidth > clientWidth, then there is a scroll bar and images to the right, and vice versa
    const bool = carousel.scrollWidth > carousel.clientWidth;
    setRightImage(bool)
  }

  return (
    <div>

      {/*if images exist on the right, right button exists */}

      {imagesToTheRight ? (
        <RightButton onClick={scrollRight}>
          ⇨
        </RightButton>
      ) : null}

      {/* carousel is given an id to move the element, and set if there is right images to load the right button */}
      {parentProductIDInfo ? (
      <ListContainer id="productCarousel" onLoad={overflow}>
        { /* map over the related product IDs and pass info to cards */ }
        {relatedProducts.map((product) => (

          <RelatedProductCard
            parentProductID={productID}
            productID={product}
            parentProductIDInfo={parentProductIDInfo}
            updateProduct={updateProduct}
          />
        ))}
      </ListContainer>
      ) : null}
      {/*if images exist on the left, left button exists */}
      {imagesToTheLeft ? (
        <LeftButton onClick={scrollLeft}>
          ⇦
        </LeftButton>
      ) : null}
    </div>

  );
}

const ListContainer = styled.div`
display: flex;
justify-content: flex-start;
overflow: scroll;
position: relative;
height: 415px;
margin: 0px;
padding: 0px;
transitions: .5s;
scroll-behavior: smooth;
`;

const LeftButton = styled.button`
  position: absolute;
  background-color: white;
  width: 40px;
  height: 40px;
  top: 35%;
  left: -50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 25px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const RightButton = styled.button`
  position: absolute;
  background-color: white;
  right: -50px;
  top: 35%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 25px;
  &:hover {
    background-color: black;
    color: white;
  }
`;


export default RelatedProductList;