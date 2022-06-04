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
        return data.data;
      })
      .then((info) => {
        setParent(info)
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductsList', error);
      });
  };

  useEffect(onLoad, [productID]);

  function scrollLeft() {
    setRightImage(true);
    const carousel = document.getElementById('productCarousel');
    carousel.scrollLeft -= 500;
    if (carousel.scrollLeft <= 500) {
      setLeftImage(false);
    };
  };

  function scrollRight() {
    setLeftImage(true);
    const carousel = document.getElementById('productCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 500;
    if (carousel.scrollLeft >= amountLeftToScroll - 500) {
      setRightImage(false);
    };
  };

  function overflow() {
    const carousel = document.getElementById('productCarousel');
    const bool = carousel.scrollWidth > carousel.clientWidth;
    setRightImage(bool);
  };

  return (
    <div>
      {imagesToTheRight ? (
        <RightButton onClick={scrollRight}>
          ⇨
        </RightButton>
      ) : null}

      {parentProductIDInfo ? (
      <ListContainer id="productCarousel" onLoad={overflow}>
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