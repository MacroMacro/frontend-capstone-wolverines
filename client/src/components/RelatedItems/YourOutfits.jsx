import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import styled from 'styled-components';

class YourOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      parentProductIDInfo: {},
      imagesToTheLeft: false,
      imagesToTheRight: true,
      cardOverflow: false,
    };
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.overflow = this.overflow.bind(this);
    this.handleCompareClick = this.handleCompareClick.bind(this);
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
  };

  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('productCarousels');
    carousel.scrollLeft -= 500;
    if (carousel.scrollLeft <= 500) {
      this.setState({
        imagesToTheLeft: false,
      });
    };
  };

  scrollRight() {
    this.setState({
      imagesToTheLeft: true,
    });
    const carousel = document.getElementById('productCarousels');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollLeft += 500;
    if (carousel.scrollLeft >= amountLeftToScroll - 500) {
      this.setState({
        imagesToTheRight: false,
      });
    };
  };

  overflow() {
    const carousel = document.getElementById('productCarousels');
    const bool = carousel.scrollWidth > carousel.clientWidth;
    this.setState({
      imagesToTheRight: bool,
    });
  };

  handleCompareClick() {
    const { productID } = this.props;
    localStorage.setItem(productID, productID);
    window.location.reload(false);
  };

  render() {
    const { parentProductIDInfo, imagesToTheRight, imagesToTheLeft  } = this.state;
    const { relatedProducts, productID } = this.props;
    return (
      <div>
        {imagesToTheRight ? (
          <RightButton onClick={this.scrollRight}>
            ⇨
          </RightButton>
        ) : null}

        <ListContainer id="productCarousels" onLoad={this.overflow}>
          <CardContainer>
              <ImageHolder>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" onClick={this.handleCompareClick}/>
              </ImageHolder>
          </CardContainer>

          {Object.keys(localStorage).map((product) => (
            <OutfitCard
              parentProductID={productID}
              productID={product}
              parentProductIDInfo={parentProductIDInfo}
              key={product}
            />
          ))}
        </ListContainer>

        {imagesToTheLeft ? (
            <LeftButton onClick={this.scrollLeft}>
              ⇦
            </LeftButton>
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

const CardContainer = styled.div`
  height: 400px;
  width: 275px;
  position: relative;
  flex-shrink: 0;
  margin: 10px 10px;
  outline-style: inset;
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

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: 50% 0;
  z-index: 0;
`;

const ImageHolder = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;

export default YourOutfits;