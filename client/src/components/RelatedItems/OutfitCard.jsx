

/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from 'react-star-ratings';

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    const { parentProductIDInfo } = this.props;
    this.state = {
      productIDInfo: '',
      parentProductIDInfo,
      featuredURL: '',
      loaded: 0,
      openCompareModal: false,
      combinedFeatures: '',
      salePrice: '',
      rating: 0,
    };
    // bind functions here
    this.handleCompareClick = this.handleCompareClick.bind(this);
    // this.combineFeatures = this.combineFeatures.bind(this);
    // this.changeProduct = this.changeProduct.bind(this);
  }

  componentDidMount() {
    const { productID, parentProductIDInfo } = this.props;
    // map over the IDs and store the info of them and the parent into the state
    axios.get(`/product/?id=${productID}`)
      .then(({ data }) => {
        this.setState({
          productIDInfo: data,
          parentProductFeatures: parentProductIDInfo.features,
          currentProductFeatures: data.features,
          loaded: this.state.loaded + 1,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductCard', error);
      });

    // Fan's star rating
    axios.get(`/reviews/${productID}`)
      .then((response)=> { return response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0)/response.data['results'].length})
      .then((averating) => {
        this.setState({
          rating: averating
        });
      })
      .catch((err) => console.log(`can't load for product with id ${productID}`));

    // map over the IDs and find the default image
    axios.get(`/styles/?id=${productID}`)
      .then(({ data }) => {
        const defaultProduct = data.results.find((product) => product['default?'] === true);
        let url;
        // if no default, then set it equal to the first image
        if (!defaultProduct) {
          url = data.results[0].photos[0].thumbnail_url;
          this.setState({
            salePrice: data.results[0].sale_price,
          });
        // if default, set the url to be the default image's thumbnail
        } else {
          url = defaultProduct.photos[0].thumbnail_url;
          this.setState({
            salePrice: defaultProduct.sale_price,
          });
        }
        // if not image url, then give it a no image available
        if (url === null) {
          this.setState({
            loaded: this.state.loaded + 1,
            featuredURL: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
          });
        } else {
          this.setState({
            loaded: this.state.loaded + 1,
            featuredURL: url,
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching product styles in relatedProductCard', error);
      });
  }

  //
  handleCompareClick() {
    const { productID } = this.props;
    localStorage.removeItem(productID)
    window.location.reload(false);
  }

  render() {
    const {
      salePrice,
      loaded,
      featuredURL,
      productIDInfo, openCompareModal, parentProductIDInfo,
      combinedFeatures,
      rating,
    } = this.state;
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
              <CompareButton onClick={this.handleCompareClick}>X</CompareButton>
            </ButtonWrapper>

            <ImageWrapper>
              <Image src={featuredURL} alt={productIDInfo.name} />
            </ImageWrapper>

            <ProductContentWrapper>
              <small>{productIDInfo.category}</small>
            </ProductContentWrapper>

            <ProductContentWrapper onClick={this.changeProduct} style={{ fontSize: '17px', fontWeight: 'bold' }}>
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
              closeModal={this.handleCompareClick}
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
}

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
  border-radius: 50%;
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

export default OutfitCard;