import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from 'react-star-ratings';

function RelatedProductCard ({parentProductID, productID, parentProductIDInfo, updateProduct}) {
  const [rating, setRating] = useState(0);
  const [productIDInfo, setProduct] = useState({});
  const [parentProductFeatures, setParentProduct] = useState({});
  const [currentProductFeatures, setCurrentProduct] = useState({});
  const [featuredURL, setURL] = useState('');
  const [loaded, setLoaded] = useState(0);
  const [openCompareModal, setModal] = useState(false);
  const [combinedFeatures, setCombined] = useState([]);
  const [salePrice, setSale] = useState(0);

  const onLoad = ()=> {
    console.log(parentProductIDInfo)
    axios.get(`/product/?id=${productID}`)
    .then(({ data }) => {
      setProduct(data);
      setCurrentProduct(data.features);
      setParentProduct(parentProductIDInfo.features);
      setLoaded(loaded => loaded+1)
    })
    .catch((error) => {
      console.log('Error fetching product details in relatedProductCard', error);
    });

    // Fan's star rating
    axios.get(`/reviews/${productID}`)
    .then((response)=> { return response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0)/response.data['results'].length})
    .then((aveRating) => {
      setRating(aveRating);
    })
    .catch((err) => console.log(`can't load for product with id ${productID}`));

    // map over the IDs and find the default image
    axios.get(`/styles/?id=${productID}`)
    .then(({ data }) => {
      // console.log(data.results)
      const defaultProduct = data.results.find((product) => product['default?'] === true);
      let url;
      // if no default, then set it equal to the first image
      if (!defaultProduct) {
        url = data.results[0].photos[0].thumbnail_url;
        setSale(data.results[0].sale_price);
      // if default, set the url to be the default image's thumbnail
      } else {
        url = defaultProduct.photos[0].thumbnail_url;
        setSale(defaultProduct.sale_price);
      }
      // if not image url, then give it a no image available
      if (url === null) {
        setLoaded(loaded => loaded+1);
        setURL('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
      } else {
        setLoaded(loaded => loaded+1);
        setURL(url);
      }
    })
    .catch((error) => {
      console.log('Error fetching product styles in relatedProductCard', error);
    });
  }


  useEffect(onLoad, [productID]);

  //
  function handleCompareClick() {
    setModal(!openCompareModal);
    combineFeatures(parentProductFeatures, currentProductFeatures);
  }

  function changeProduct(event) {
    updateProduct(productID);
  }

  function combineFeatures(parentProduct, currentProduct) {
    // goal is to get features into an array so we can map over it in comparisonModal

    const combinedFeatures = {};
    console.log(parentProduct)

    parentProduct.forEach((product) => {
      if (!combinedFeatures[product.feature]) {
        if (product.value === null) {
          combinedFeatures[product.feature] = ['✔️'];
        } else {
          combinedFeatures[product.feature] = [product.value];
        }
      }
    });

    currentProduct.forEach((product) => {
      if (!combinedFeatures[product.feature]) {
        if (product.value === null) {
          combinedFeatures[product.feature] = [];
          combinedFeatures[product.feature][1] = '✔️';
        } else {
          combinedFeatures[product.feature] = [];
          combinedFeatures[product.feature][1] = product.value;
        }
      } else if (product.value === null) {
        combinedFeatures[product.feature][1] = '✔️';
      } else {
        combinedFeatures[product.feature][1] = product.value;
      }
    });

    const arrayOfCombinedFeatures = [];
    const features = Object.keys(combinedFeatures);
    const values = Object.values(combinedFeatures);

    // eslint-disable-next-line no-plusplus
    for (let p = 0; p < features.length; p++) {
      arrayOfCombinedFeatures.push(values[p][0], features[p], values[p][1]);
    }

    setCombined(arrayOfCombinedFeatures);
  }

  const sale = {
    textDecoration: salePrice ? 'line-through' : 'none',
    color: salePrice ? 'red' : 'black',
    fontSize: '15px',
  };
  const loading = {
    backgroundImage: 'url("https://mk0wwwpoqcommervacts.kinstacdn.com/wp-content/uploads/2018/11/image3.gif")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };


  return (

    <div>

      {/* If < 2 maintain loading */}
      {
        loaded < 2
        && <CardContainer style={loading} />
      }
      {
        loaded >= 2
        && (
        <CardContainer>
          {/* <br></br> */}
          {/* Compare Modal button*/}
          <ButtonWrapper>
            <CompareButton onClick={handleCompareClick}>⭐</CompareButton>
          </ButtonWrapper>

          <ImageWrapper onClick={changeProduct}>
            <Image src={featuredURL} alt={productIDInfo.name} />
          </ImageWrapper>

          <ProductContentWrapper>
            <small>{productIDInfo.category}</small>
          </ProductContentWrapper>

          <ProductContentWrapper onClick={changeProduct} style={{ fontSize: '17px', fontWeight: 'bold' }}>
            {productIDInfo.name}
          </ProductContentWrapper>

          <ProductContentWrapper style={sale}>
            ${productIDInfo.default_price}
          </ProductContentWrapper>


          <ProductContentWrapper>
            <StarRating rating = {rating} starRatedColor="black" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
          </ProductContentWrapper>

          </CardContainer>
          )

      }
      {
        openCompareModal
        && (
        <div>
          <ComparisonModal
            closeModal={handleCompareClick}
            parentProduct={parentProductIDInfo.name}
            compareProduct={productIDInfo.name}
            combinedFeatures={combinedFeatures}
          />
        </div>
        )
      }
    </div>
  );
}


// import React from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import ComparisonModal from './ComparisonModal.jsx';
// import StarRating from 'react-star-ratings';

// class RelatedProductCard extends React.Component {
//   constructor(props) {
//     super(props);
//     const { parentProductIDInfo } = this.props;
//     this.state = {
//       productIDInfo: '',
//       parentProductIDInfo,
//       featuredURL: '',
//       loaded: 0,
//       openCompareModal: false,
//       combinedFeatures: '',
//       salePrice: '',
//       rating: 0,
//     };
//     // bind functions here
//     this.handleCompareClick = this.handleCompareClick.bind(this);
//     this.combineFeatures = this.combineFeatures.bind(this);
//     this.changeProduct = this.changeProduct.bind(this);
//   }

//   componentDidMount() {
//     const { productID, parentProductIDInfo } = this.props;
//     // map over the IDs and store the info of them and the parent into the state
//     axios.get(`/product/?id=${productID}`)
//       .then(({ data }) => {
//         console.log(data)
//         this.setState({
//           productIDInfo: data,
//           parentProductFeatures: parentProductIDInfo.features,
//           currentProductFeatures: data.features,
//           loaded: this.state.loaded + 1,
//         });
//       })
//       .catch((error) => {
//         console.log('Error fetching product details in relatedProductCard', error);
//       });

//     // Fan's star rating
//     axios.get(`/reviews/${productID}`)
//       .then((response)=> { return response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0)/response.data['results'].length})
//       .then((averating) => {
//         this.setState({
//           rating: averating
//         });
//       })
//       .catch((err) => console.log(`can't load for product with id ${productID}`));

//     // map over the IDs and find the default image
//     axios.get(`/styles/?id=${productID}`)
//       .then(({ data }) => {
//         console.log(data.results)
//         const defaultProduct = data.results.find((product) => product['default?'] === true);
//         let url;
//         // if no default, then set it equal to the first image
//         if (!defaultProduct) {
//           url = data.results[0].photos[0].thumbnail_url;
//           this.setState({
//             salePrice: data.results[0].sale_price,
//           });
//         // if default, set the url to be the default image's thumbnail
//         } else {
//           url = defaultProduct.photos[0].thumbnail_url;
//           this.setState({
//             salePrice: defaultProduct.sale_price,
//           });
//         }
//         // if not image url, then give it a no image available
//         if (url === null) {
//           this.setState({
//             loaded: this.state.loaded + 1,
//             featuredURL: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
//           });
//         } else {
//           this.setState({
//             loaded: this.state.loaded + 1,
//             featuredURL: url,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log('Error fetching product styles in relatedProductCard', error);
//       });
//   }

//   //
//   handleCompareClick() {
//     const { openCompareModal, parentProductFeatures, currentProductFeatures } = this.state;
//     this.setState({
//       openCompareModal: !openCompareModal,
//     });
//     this.combineFeatures(parentProductFeatures, currentProductFeatures);
//   }

//   changeProduct(event) {
//     const { productID, updateProduct } = this.props;
//     console.log(productID)
//     console.log(event.currentTarget)
//     updateProduct(productID);
//     // window.location.reload(false);
//   }

//   combineFeatures(parentProduct, currentProduct) {
//     // goal is to get features into an array so we can map over it in comparisonModal

//     const combinedFeatures = {};

//     parentProduct.forEach((product) => {
//       if (!combinedFeatures[product.feature]) {
//         if (product.value === null) {
//           combinedFeatures[product.feature] = ['✔️'];
//         } else {
//           combinedFeatures[product.feature] = [product.value];
//         }
//       }
//     });

//     currentProduct.forEach((product) => {
//       if (!combinedFeatures[product.feature]) {
//         if (product.value === null) {
//           combinedFeatures[product.feature] = [];
//           combinedFeatures[product.feature][1] = '✔️';
//         } else {
//           combinedFeatures[product.feature] = [];
//           combinedFeatures[product.feature][1] = product.value;
//         }
//       } else if (product.value === null) {
//         combinedFeatures[product.feature][1] = '✔️';
//       } else {
//         combinedFeatures[product.feature][1] = product.value;
//       }
//     });

//     const arrayOfCombinedFeatures = [];
//     const features = Object.keys(combinedFeatures);
//     const values = Object.values(combinedFeatures);

//     // eslint-disable-next-line no-plusplus
//     for (let p = 0; p < features.length; p++) {
//       arrayOfCombinedFeatures.push(values[p][0], features[p], values[p][1]);
//     }

//     this.setState({
//       combinedFeatures: arrayOfCombinedFeatures,
//     });
//   }

//   render() {
//     const {
//       salePrice,
//       loaded,
//       featuredURL,
//       productIDInfo, openCompareModal, parentProductIDInfo,
//       combinedFeatures,
//       rating,
//     } = this.state;
//     const sale = {
//       textDecoration: salePrice ? 'line-through' : 'none',
//       color: salePrice ? 'red' : 'black',
//       fontSize: '15px',
//     };
//     const loading = {
//       backgroundImage: 'url("https://mk0wwwpoqcommervacts.kinstacdn.com/wp-content/uploads/2018/11/image3.gif")',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: 'contain',
//     };
//     return (
//       <div>
//         {/* If < 2 maintain loading */}
//         {
//           loaded < 2
//           && <CardContainer style={loading} />
//         }
//         {
//           loaded >= 2
//           && (
//           <CardContainer onClick={this.changeProduct}>
//             {/* <br></br> */}
//             {/* Compare Modal button*/}
//             <ButtonWrapper>
//               <CompareButton onClick={this.handleCompareClick}>⭐</CompareButton>
//             </ButtonWrapper>

//             <ImageWrapper>
//               <Image src={featuredURL} alt={productIDInfo.name} />
//             </ImageWrapper>

//             <ProductContentWrapper>
//               <small>{productIDInfo.category}</small>
//             </ProductContentWrapper>

//             <ProductContentWrapper onClick={this.changeProduct} style={{ fontSize: '17px', fontWeight: 'bold' }}>
//               {productIDInfo.name}
//             </ProductContentWrapper>

//             <ProductContentWrapper style={sale}>
//               ${productIDInfo.default_price}
//             </ProductContentWrapper>


//             <ProductContentWrapper>
//               <StarRating rating = {rating} starRatedColor="black" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
//             </ProductContentWrapper>

//             </CardContainer>
//             )

//         }
//         {
//           openCompareModal
//           && (
//           <div>
//             <ComparisonModal
//               closeModal={this.handleCompareClick}
//               parentProduct={parentProductIDInfo.name}
//               compareProduct={productIDInfo.name}
//               combinedFeatures={combinedFeatures}
//             />
//           </div>
//           )
//         }
//       </div>
//     );
//   }
// }

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
object-position: 50% 0;
z-index: 0;
`;

const ProductContentWrapper = styled.div`
  margin: 5px 15px;
`;

const CardContainer = styled.div`
height: 400px;
width: 275px;
position: relative;
flex-shrink: 0;
margin: 10px 10px;
outline-style: inset;
// background: rgba(255,255,255,0.1);
// background: linear-gradient(180deg, hsl(190,70%,99%), hsl(240,60%,100%));
// &:hover {
//   box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
//   bottom-border: 0px;
//   cursor: pointer;
// }
`;

const CompareButton = styled.button`
  postition: relative;
  cursor: pointer;
  border: ;
  background: none;
  font-size: 25px;
  color: black;
  &:hover {
    color: gold;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 15px;
  margin-top: 5px;
  z-index: 10;
  background: white;
`;

const ImageWrapper = styled.div`
height: 200px;
width: auto;
margin-bottom: 30px;
`;



export default RelatedProductCard;