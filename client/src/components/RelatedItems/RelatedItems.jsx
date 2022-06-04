import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfits from './YourOutfits.jsx';

function RelatedItems ({product, productID, updateProduct}) {
  const [relatedProducts, setRelated] = useState([]);

  const onLoad = ()=> {
  axios.get(`/related/?id=${productID}`)
    .then(({ data }) => {
      let uniqueIDs = [];
      data.forEach((id) => {
        if (uniqueIDs.indexOf(id) < 0) {
          uniqueIDs.push(id);
        }
      });
      setRelated(uniqueIDs);
    })
    .catch((error) => {
      console.log('Error getting related data in relatedProductsMainView', error);
    });
}

  useEffect(onLoad, [productID]);

  return (
    <RelatedItemsAndOutfit id="RelatedItemsAndOutfit">
    <div>
      <div>
        <Fonts>RELATED PRODUCTS</Fonts>
      </div>
      <ListWrapper>
        <RelatedProductsList
          productID={productID}
          relatedProducts={relatedProducts}
          updateProduct={updateProduct}
        />
      </ListWrapper>
      <br></br>
      <div>
        <Fonts>YOUR OUTFIT</Fonts>
      </div>
      <ListWrapper>
        <YourOutfits
          productID={productID}
          relatedProducts={relatedProducts}
        />
      </ListWrapper>
    </div>
    </RelatedItemsAndOutfit>
  );
}

const RelatedItemsAndOutfit = styled.div`
  padding: 5px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  max-width: 1200px;
`;

const ListWrapper = styled.div`
  margin: 10px 0px 0px;
  position: relative;
  width: 100%;
`;

const Fonts = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;

export default RelatedItems;