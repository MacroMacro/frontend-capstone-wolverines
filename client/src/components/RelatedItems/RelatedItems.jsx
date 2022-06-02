import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfits from './YourOutfits.jsx';

function RelatedItems ({product, productID, updateProduct}) {
  const [relatedProducts, setRelated] = useState([]);

  const onLoad = ()=> {
  // get request for related product IDs
  axios.get(`/related/?id=${productID}`)
  .then(({ data }) => {
    // not all the data is unique, so filter the unique ones
    let uniqueIDs = [];
    data.forEach((id) => {
      if (uniqueIDs.indexOf(id) < 0) {
        uniqueIDs.push(id)
      }
    })
    // change the state of related products
    setRelated(uniqueIDs)
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
        <h3>RELATED PRODUCTS</h3>
      </div>
      <ListWrapper>
        {/* pass related IDs and the current product ID down*/}
        <RelatedProductsList
          productID={productID}
          relatedProducts={relatedProducts}
          updateProduct={updateProduct}
        />
      </ListWrapper>

      <div>
        <h3>YOUR OUTFIT</h3>
        {/* <span style={{ fontSize: '17px', fontWeight: 'bold' }}></span> */}
      </div>
      <ListWrapper>
        {/* pass related IDs and the current product ID down*/}
        <YourOutfits
          productID={productID}
          relatedProducts={relatedProducts}
        />
      </ListWrapper>
    </div>
    </RelatedItemsAndOutfit>
  );
}

export default RelatedItems;

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