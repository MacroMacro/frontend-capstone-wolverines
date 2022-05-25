import React from 'react';
import axios from 'axios';
import RelatedProductCard from './RelatedProductCard.jsx';
import styled from 'styled-components';
// import ListContainer from '../sharedStyledComponents/listContainer';
// import RightButtonWrapper from '../sharedStyledComponents/rightButtonWrapper';
// import LeftButtonWrapper from '../sharedStyledComponents/leftButtonWrapper';
// import LeftButton from '../sharedStyledComponents/leftButton';
// import RightButton from '../sharedStyledComponents/rightButton';

class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIDInfo: '',
      imagesToTheLeft: false,
      imagesToTheRight: true,
      cardOverflow: false,
    };
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.isOverflowing = this.isOverflowing.bind(this);
  }

  componentDidMount() {
    const { productID } = this.props;
    axios.get(`/product/?id=${productID}`)
      .then(({ data }) => {
        this.setState({
          parentProductIDInfo: data,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductsList', error);
      });
  }

  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('productCarousel');
    carousel.scrollLeft -= 316;
    if (carousel.scrollLeft <= 316) {
      this.setState({
        imagesToTheLeft: false,
      });
    }
  }

  scrollRight() {
    this.setState({
      imagesToTheLeft: true,
    });
    const carousel = document.getElementById('productCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 316;
    if (carousel.scrollLeft >= amountLeftToScroll - 316) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    const carousel = document.getElementById('productCarousel');
    const bool = carousel.scrollWidth > carousel.clientWidth;
    this.setState({
      cardOverflow: bool,
      imagesToTheRight: bool,
    });
  }

  render() {
    const { parentProductIDInfo, imagesToTheRight, imagesToTheLeft  } = this.state;
    const { relatedProducts, productID } = this.props;
    if (parentProductIDInfo.length === 0) {
      return (
        null
      );
    }
    return (
      <div>
        {imagesToTheRight
          ? (
            <RightButtonWrapper>
              <RightButton onClick={this.scrollRight}>
                &#8250;
              </RightButton>
            </RightButtonWrapper>
          ) : null}
        <ListContainer id="productCarousel" onLoad={this.isOverflowing}>
          {relatedProducts.map((product) => (
            <RelatedProductCard
              parentProductID={productID}
              // updateProduct={this.props.updateProduct}
              productID={product}
              parentProductIDInfo={parentProductIDInfo}
              key={product}
            />
          ))}
        </ListContainer>
        {imagesToTheLeft ? (
          <LeftButtonWrapper>
            <LeftButton onClick={this.scrollLeft}>
              &#8249;
            </LeftButton>
          </LeftButtonWrapper>
        ) : null}
      </div>

    );
  }
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
  left: 2%;
  top: 25%;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  font-size: 40px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const RightButton = styled.button`
  position: absolute;
  right: 2%;
  top: 25%;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  font-size: 40px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const LeftButtonWrapper = styled.div`
  position: absolute;
  left: 1%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  border: none;
  cursor: pointer;
  z-index: 0;
  outline: 0;
`;


const RightButtonWrapper = styled.div`
  position: absolute;
  right: -1%;
  top: 0px;
  padding-left: 60px;
  height: 89%;
  border: none;
  cursor: pointer;
  z-index: 1;
  outline: 0;
`;


export default RelatedProductList;