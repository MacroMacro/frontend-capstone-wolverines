import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

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

  const sizeDisplay = [<Select className = 'select-size' placeholder = 'SELECT SIZE'
  onChange = {changeSize} options = {sizeOptions}/>, <Select className = 'select-size' placeholder = 'SELECT SIZE'
  onChange = {changeSize} menuIsOpen options = {sizeOptions}/>];
  const warning = ['', 'Please select size'];

  const starDisplay = ['star-nofill', 'star-fill']

  const quantOptions = Array.from({length: Math.min(15, quantA)}, (_, i) => {return ({'value': i+1, 'label': i+1})});

  function changeQuant (e) {
    setQuantC(e.value);
  }

  function addCart () {
    if (sizeC === undefined) {
      setDisplay(1);
    }
    if (quantA === quantC){
      delete skus[curSku];
    }
    setQuantA(quantA - quantC);
    axios.post(`/cart/?sku_id=${curSku}`);
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
    <div className = 'Skus'>
      <div className = 'warning'>{warning[display]}</div>
      <div className = 'Select'>
      {sizeOptions.length > 0 ?
      <>{sizeDisplay[display]}</>
      : <Select className = 'select-size' placeholder = 'OUT OF STOCK' isDisabled = {true} />}

      {sizeC ? <Select className = 'select-quant' placeholder = {'1'} onChange = {changeQuant} options = {quantOptions}/> : <Select className = 'select-quant' placeholder = '-'/>}
      </div>

      <div className = 'Carts'>
        {sizeOptions.length > 0 ?
          <div className = 'add-cart'><button className = 'cart' onClick = {addCart} >Add to Cart</button></div> :
          <div className = 'add-cart'><button className = 'cart' disabled>Add to Cart</button></div>}
        <div className ='add-star' onClick = {starClick}><div class="material-symbols-outlined" id = {[starDisplay[starred]]} >grade</div></div>
      </div>

    </div>
  );
}

export default Skus;