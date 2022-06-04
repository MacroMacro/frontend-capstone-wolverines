import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
      salePrice: '',
      rating: 0,
    };

    this.handleCompareClick = this.handleCompareClick.bind(this);
  }

  componentDidMount() {
    const { productID, parentProductIDInfo } = this.props;
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

    axios.get(`/reviews/${productID}`)
      .then((response)=> response.data['results'].reduce((prev, cur) => prev = prev + cur['rating'], 0)/response.data['results'].length)
      .then((averating) => {
        this.setState({
          rating: averating
        });
      })
      .catch((err) => console.log(`can't load for product with id ${productID}`));

    axios.get(`/styles/?id=${productID}`)
      .then(({ data }) => {
        const defaultProduct = data.results.find((product) => product['default?'] === true);
        let url;
        if (!defaultProduct) {
          url = data.results[0].photos[0].thumbnail_url;
          this.setState({
            salePrice: data.results[0].sale_price,
          });
        } else {
          url = defaultProduct.photos[0].thumbnail_url;
          this.setState({
            salePrice: defaultProduct.sale_price,
          });
        };
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
        };
      })
      .catch((error) => {
        console.log('Error fetching product styles in relatedProductCard', error);
      });
  };

  handleCompareClick() {
    const { productID } = this.props;
    localStorage.removeItem(productID);
    window.location.reload(false);
  };

  render() {
    const {
      salePrice,
      loaded,
      featuredURL,
      productIDInfo, parentProductIDInfo,
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
        {loaded < 2 &&
          <CardContainer style={loading} />
        }
        {loaded >= 2 &&
          <CardContainer>
            <Button>
              <CompareButton onClick={this.handleCompareClick}>X</CompareButton>
            </Button>

            <ImageHolder>
              <Image src={featuredURL} alt={productIDInfo.name} />
            </ImageHolder>

            <BasicLayout>
              <small>{productIDInfo.category}</small>
            </BasicLayout>

            <BasicLayout onClick={this.changeProduct} style={{fontSize: "17px", fontWeight: "bold"}}>
              {productIDInfo.name}
            </BasicLayout>

            <BasicLayout style={sale}>
              ${productIDInfo.default_price}
            </BasicLayout>


            <BasicLayout>
              <StarRating rating={rating} starRatedColor="gold" starEmptyColor="grey" starSelectingHoverColor="black"
              numberOfStars={5} name="rating" starDimension="15px" starSpacing="0px"/>
            </BasicLayout>

            </CardContainer>
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

const BasicLayout = styled.div`
  margin: 5px 15px;
  font-family: 'Roboto', sans-serif;
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
  border-radius: 50%;
  background: none;
  font-size: 25px;
  color: black;
`;

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 15px;
  margin-top: 5px;
  z-index: 5000;
  background: white;
`;

const ImageHolder = styled.div`
  height: 200px;
  width: auto;
  margin-bottom: 30px;
`;

export default OutfitCard;