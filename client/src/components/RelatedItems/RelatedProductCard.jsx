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

  function handleCompareClick() {
    setModal(!openCompareModal);
    combineFeatures(parentProductFeatures, currentProductFeatures);
  }

  function changeProduct(event) {
    updateProduct(productID);
  }

  function combineFeatures(parentProduct, currentProduct) {
    const combinedFeatures = {};
    // console.log(parentProduct)

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
      // console.log(product)
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

    const comparedFeatures = [];
    const features = Object.keys(combinedFeatures);
    const values = Object.values(combinedFeatures);

    for (let i = 0; i < features.length; i++) {
      comparedFeatures.push(values[i][0], features[i], values[i][1]);
    }

    setCombined(comparedFeatures);
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
      {loaded < 2 &&
        <CardContainer style={loading} />
      }
      {loaded >= 2 &&
        <CardContainer>
          {/* <br></br> */}
          {/* Compare Modal button*/}
          <Button>
            <CompareButton onClick={handleCompareClick}>⭐</CompareButton>
          </Button>

          <ImageHolder onClick={changeProduct}>
            <Image src={featuredURL} alt={productIDInfo.name} />
          </ImageHolder>

          <BasicLayout>
            <small>{productIDInfo.category}</small>
          </BasicLayout>

          <BasicLayout onClick={changeProduct} style={{ fontSize: '17px', fontWeight: 'bold' }}>
            {productIDInfo.name}
          </BasicLayout>

          <BasicLayout style={sale}>
            ${productIDInfo.default_price}
          </BasicLayout>


          <BasicLayout>
            <StarRating rating = {rating} starRatedColor="gold" starEmptyColor ='grey' starSelectingHoverColor = 'black' numberOfStars={5} name='rating' starDimension="15px" starSpacing="0px"/>
          </BasicLayout>

          </CardContainer>
      }
      {openCompareModal &&
        <div>
          <ComparisonModal
            closeModal={handleCompareClick}
            parentProduct={parentProductIDInfo.name}
            compareProduct={productIDInfo.name}
            combinedFeatures={combinedFeatures}
          />
        </div>
      }
    </div>
  );
}

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
object-position: 50% 0;
z-index: 0;
`;

const BasicLayout = styled.div`
  margin: 5px 15px;
`;

const CardContainer = styled.div`
height: 400px;
width: 275px;
position: relative;
flex-shrink: 0;
margin: 10px 10px;
outline-style: inset;
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

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 15px;
  margin-top: 5px;
  z-index: 10;
  background: white;
`;

const ImageHolder = styled.div`
height: 200px;
width: auto;
margin-bottom: 30px;
`;



export default RelatedProductCard;