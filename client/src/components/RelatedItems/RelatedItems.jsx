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

    // this.setState({
    //   relatedProducts: data,
    // });
  })
  .catch((error) => {
    console.log('Error getting related data in relatedProductsMainView', error);
  });
}

  useEffect(onLoad, [productID]);

  return (
    <AllEncompassing id="AllEncompassing">
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
    </AllEncompassing>
  );
}

export default RelatedItems;

//STANDARD REACT

// import React from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import RelatedProductsList from './RelatedProductsList.jsx';
// import YourOutfits from './YourOutfits.jsx';

// class RelatedItems extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       relatedProducts: [],
//     };
//   }

//   componentDidMount() {
//     const { productID } = this.props;
//     console.log(productID, 'id')
//     // get request for related product IDs
//     axios.get(`/related/?id=${productID}`)
//       .then(({ data }) => {
//         // not all the data is unique, so filter the unique ones
//         let uniqueIDs = [];
//         data.forEach((id) => {
//           if (uniqueIDs.indexOf(id) < 0) {
//             uniqueIDs.push(id)
//           }
//         })
//         // change the state of related products
//         this.setState({
//           relatedProducts: uniqueIDs,
//         });

//         // this.setState({
//         //   relatedProducts: data,
//         // });
//       })
//       .catch((error) => {
//         console.log('Error getting related data in relatedProductsMainView', error);
//       });
//   }

//   render() {
//   // destructure props/states
//     // const { relatedProducts } = this.state;
//     // const { productID } = this.props;
//     return (
//       <AllEncompassing id="AllEncompassing">
//       <div>
//         <div>
//           <h3>RELATED PRODUCTS</h3>
//         </div>
//         <ListWrapper>
//           {/* pass related IDs and the current product ID down*/}
//           <RelatedProductsList
//             productID={this.props.productID}
//             relatedProducts={this.state.relatedProducts}
//             updateProduct={this.props.updateProduct}
//           />
//         </ListWrapper>

//         <div>
//           <h3>YOUR OUTFIT</h3>
//           {/* <span style={{ fontSize: '17px', fontWeight: 'bold' }}></span> */}
//         </div>
//         <ListWrapper>
//           {/* pass related IDs and the current product ID down*/}
//           <YourOutfits
//             productID={this.props.productID}
//             relatedProducts={this.state.relatedProducts}
//           />
//         </ListWrapper>
//       </div>
//       </AllEncompassing>
//     );
//   }
// }

// export default RelatedItems;

const AllEncompassing = styled.div`
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