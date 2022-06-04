import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styled from 'styled-components';

function Skus ({skus, addYourOutfit}) {
  const [display, setDisplay] = useState(0);
  const [quantA, setQuantA] = useState();
  const [quantC, setQuantC] = useState(1);
  const [sizeC, setSizeC] = useState();
  const [curSku, setCurSku] = useState();
  const [starred, setStarred] = useState(0);

  function changeSize (e) {
    setQuantA(skus[e.value]['quantity']);
    setSizeC(skus[e.value]['size']);
    setDisplay(0);
    setCurSku(e.value);
  }

  const sizeOptions = [];
  Object.keys(skus).map((key) => {
    if (skus[key]['quantity']>0) {
      sizeOptions.push({'value': key, 'label': skus[key]['size']})};
    });

  const sizeDisplay = [
    <Select placeholder = 'SELECT SIZE' onChange = {changeSize} options = {sizeOptions}/>,
    <Select placeholder = 'SELECT SIZE' onChange = {changeSize} menuIsOpen options = {sizeOptions}/>];

  const warning = ['', 'Please select size'];

  const quantOptions = Array.from({length: Math.min(15, quantA)}, (_, i) => {return ({'value': i+1, 'label': i+1})});

  function changeQuant (e) {
    setQuantC(e.value);
  }

  function addCart () {
    if (sizeC === undefined) {
      setDisplay(1);
    } else {
      if (quantA === quantC){
        delete skus[curSku];
      }
      setQuantA(quantA - quantC);
      for (var i= 0; i<quantC; i++) {
        axios.post(`/cart/?sku_id=${curSku}`);
      }
    }
  }

  function starClick () {
    if (starred === 0) {
      addYourOutfit(0);
    } else {
      addYourOutfit(1);
    }
    setStarred(1 - starred);
  }

  return (
    <SkuContainer id="Skus">
      <SelectWarn>{warning[display]}</SelectWarn>
      <SelectContainer>
        <SelectSize>
          {sizeOptions.length > 0 ?
          <>{sizeDisplay[display]}</>
          : <Select placeholder="OUT OF STOCK" isDisabled = {true} />}
        </SelectSize>
        <SelectQuant>
          {sizeC ? <Select placeholder={ "1" } onChange={ changeQuant } options = {quantOptions}/>
          : <Select placeholder=" -"/>}
        </SelectQuant>
      </SelectContainer>
      <CartContainer>
        {sizeOptions.length > 0 ?
          <div><Cart data-testid="cartbutton" onClick={ addCart } >Add to Cart</Cart></div> :
          <div><Cart data-testid="cartbutton" disabled>Add to Cart</Cart></div>}

        <StarContainer>
        {starred === 0 ?
          <StarNoFill onClick = {starClick}><div className="material-symbols-outlined" id = 'star-nofill' >grade</div></StarNoFill> :
          <StarFill onClick = {starClick}><div className="material-symbols-outlined" id = 'star-fill' >grade</div></StarFill>
        }
        </StarContainer>
      </CartContainer>

    </SkuContainer>
  );
}

export default Skus;

const SkuContainer = styled.div`
  width: 500px;
`;

const SelectContainer = styled.div`
  display: flex;
`;

const SelectSize = styled.div`
  width: 50%;
  color: black;
`;

const SelectQuant = styled.div`
  margin-left: 20px;
  width: 30%;
  color: black;
`;

const SelectWarn = styled.div`
  height: 25px;
  font-size: 15px;
  color: red;
  text-transform: uppercase;
`;

const CartContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Cart = styled.button`
  height: 35px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  background-color: white;
  border: 1px solid darkgrey;
  border-radius: 7%;
  margin-left: 0px;
  margin-top: 0px;
  padding: 0px 10px;
  &:hover {
    background-color: darkgrey;
  }
`;

const StarContainer = styled.div`
  border: 1px solid darkgrey;
  border-radius: 15%;
  width: 25px;
  height: 25px;
  margin-left: 50px;
  font-size: 20px;
  padding: 5px;
  &:hover {
    background-color: darkgrey;
  }
`;

const StarNoFill = styled.div`
  border: 1px;
  color: grey;
  font-variation-settings:
  'FILL' 0;
`;

const StarFill = styled.div`
  color: #FFCC00;
  font-variation-settings:
  'FILL' 1,
  'wght' 400
`;
