import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfits from './YourOutfits.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
    };
  }


  componentDidMount() {
    const { productID } = this.props;
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
        this.setState({
          relatedProducts: uniqueIDs,
        });

        // this.setState({
        //   relatedProducts: data,
        // });
      })
      .catch((error) => {
        console.log('Error getting related data in relatedProductsMainView', error);
      });
  }

  render() {
  // destructure props/states
    // const { relatedProducts } = this.state;
    // const { productID } = this.props;
    return (
      <AllEncompassing id="AllEncompassing">
      <div>
        <div>
          <h3>RELATED PRODUCTS</h3>
        </div>
        <ListWrapper>
          {/* pass related IDs and the current product ID down*/}
          <RelatedProductsList
            productID={this.props.productID}
            relatedProducts={this.state.relatedProducts}
          />
        </ListWrapper>

        <div>
          <h3>YOUR OUTFITS</h3>
          {/* <span style={{ fontSize: '17px', fontWeight: 'bold' }}></span> */}
        </div>
        <ListWrapper>
          {/* pass related IDs and the current product ID down*/}
          <YourOutfits
            productID={this.props.productID}
            relatedProducts={this.state.relatedProducts}
          />
        </ListWrapper>
      </div>
      </AllEncompassing>
    );
  }
}

export default RelatedItems;

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

// import React, { useState, useEffect } from 'react';
// import Card from './Card.jsx';
// import axios from 'axios';
// import bluebird from 'bluebird';

// function RelatedItems (product) {
//   const[someState, setStatefn] = useState({
//     products:[],
//     product_id: '',
//     related: [],
//     styles: [],
//     idAndStyles: {}

//   })
//   console.log(product.product.id)

//   const onLoad = () => {
//     var relatedIDs;
//     var promises = [];
//     var productInfo = [];
//     var styles = [];
//     var styleInfo = [];

//     axios.get(`/related?id=${product.product.id}`)
//     .then((response) =>{
//       relatedIDs = response.data;
//       for (let i = 0; i < relatedIDs.length; i++) {
//         promises.push(
//           axios.get(`/product/?id=${relatedIDs[i]}`)
//             .then((response) => productInfo.push(response.data))
//         )
//       }
//       Promise.all(promises).then(() => console.log(productInfo, promises))
//       })
//       .then(() => {
//         for (let i = 0; i < relatedIDs.length; i++) {
//           styles.push(
//             axios.get(`/styles/?id=${relatedIDs[i]}`)
//               .then((response) => {
//                 console.log(response.data.results, 'style')
//                 styleInfo.push(response.data.results)
//               })
//           )
//         }
//         Promise.all(styles).then((values) => console.log(styleInfo, styles, values))
//         })
//       .then(() => {
//         axios.get(`/products`)
//           .then((response) =>{
//           console.log(response.data, styleInfo, productInfo, 'help')
//           setStatefn({styles: styleInfo, related: productInfo})
//       })
//       })
//       .catch(err => alert(err));

//   }

//   useEffect(onLoad, []);

//   if (someState.related.length === 0) {
//     return <div>Loading...</div>
//   }


//   return (
//     <div>

//       <div>
//         RELATED PRODUCTS
//         <Card product={someState.related} styles={someState.styles}/>
//       </div>
//       <div>
//         YOUR OUTFIT
//       </div>

//     </div>
//   );

// }


// export default RelatedItems;