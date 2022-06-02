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
    this.isOverflowing = this.isOverflowing.bind(this);
    this.handleCompareClick = this.handleCompareClick.bind(this);
  }

  componentDidMount() {
    // store original product info
    const { productID } = this.props;
    console.log(productID, 'productID')
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
    // can scroll left if there are images to the right
    this.setState({
      imagesToTheRight: true,
    });
    // find cards given ID productCarousel
    const carousel = document.getElementById('productCarousels');

    // when clicked, scrolls to left by -500
    carousel.scrollLeft -= 500;

    // if scrolled all the way to the left, there are no more images to the left
    if (carousel.scrollLeft <= 500) {
      this.setState({
        imagesToTheLeft: false,
      });
    }
  }

  scrollRight() {
    // can scroll right if there are images to the left
    this.setState({
      imagesToTheLeft: true,
    });
    // find carousel div
    const carousel = document.getElementById('productCarousels');
    // see how much room there is left to scroll over
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;

    // when clicked, moves right by 500
    carousel.scrollLeft += 500;

    // if scrolled all the way to the right, no images on the right will exist
    if (carousel.scrollLeft >= amountLeftToScroll - 500) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    // find carousel div
    const carousel = document.getElementById('productCarousels');

    //if scrollWidth > clientWidth, then there is a scroll bar and images to the right, and vice versa
    const bool = carousel.scrollWidth > carousel.clientWidth;
    this.setState({
      imagesToTheRight: bool,
    });
  }

  handleCompareClick() {
    const { productID } = this.props;
    localStorage.setItem(productID, productID)
    window.location.reload(false);
  }

  render() {
    const { parentProductIDInfo, imagesToTheRight, imagesToTheLeft  } = this.state;
    const { relatedProducts, productID } = this.props;
    return (
      <div>
        {/*if images exist on the right, right button exists */}
        {imagesToTheRight ?
          (
            <RightButton onClick={this.scrollRight}>
              ⇨
            </RightButton>
          )
          : null}

        {/* carousel is given an id to move the element, and set if there is right images to load the right button */}
        <ListContainer id="productCarousels" onLoad={this.isOverflowing}>
        <CardContainer>
            {/* <br></br> */}
            {/* Compare Modal button*/}

            <ImageWrapper>
              <Image src='https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg' onClick={this.handleCompareClick}/>
            </ImageWrapper>
            </CardContainer>

          { /* map over the related product IDs and pass info to cards */ }
          {Object.keys(localStorage).map((product) => (
            <OutfitCard
              parentProductID={productID}
              // updateProduct={this.props.updateProduct}
              productID={product}
              parentProductIDInfo={parentProductIDInfo}
              key={product}
            />
          ))}
        </ListContainer>
        {/*if images exist on the left, left button exists */}
        {imagesToTheLeft ?
          (
            <LeftButton onClick={this.scrollLeft}>
              ⇦
            </LeftButton>
          )
          : null}
      </div>

    );
  }
}

export default YourOutfits;

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
// background: rgba(255,255,255,0.1);
// background: linear-gradient(180deg, hsl(190,70%,99%), hsl(240,60%,100%));
// &:hover {
//   box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
//   bottom-border: 0px;
//   cursor: pointer;
// }
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

const ImageWrapper = styled.div`
height: 100%;
width: 100%;
margin-bottom: ;
`;


