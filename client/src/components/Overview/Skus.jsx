import React, { useState } from 'react';
import Select from 'react-select';

function Skus ({skus}) {
  const [display, setDisplay] = useState();
  const [quantA, setQuantA] = useState(0);
  const [quantC, setQuantC] = useState(0);
  const [sizeA, setSizeA] = useState(0);
  const [sizeC, setSizeC] = useState(0);


  function changeSize (e) {
    setQuantA(skus[e.value]['quantity']);
    setSizeC(skus[e.value]['size']);
  }

  const sizeOptions = [];
  Object.keys(skus).map((key) => {
    if (skus[key]['quantity']>0) {
      sizeOptions.push({'value': key, 'label': skus[key]['size']})};
    });

  var quantDisplay;
  if (quantA === 0) {
    quantDisplay = <Select className = 'select-quant' options = {[{'value': '-', 'label': '-'}]}/>;
  } else if (quantA < 15) {
    const quantOptions = Array.from({length: quantA}, (_, i) => {return ({'value': i+1, 'label': i+1})});
    quantDisplay = <Select className = 'select-quant' placeholder = {'1'} onChange = {changeQuant} options = {quantOptions}/>;
  } else {
    const quantOptions = Array.from({length: 15}, (_, i) => {return ({'value': i+1, 'label': i+1})});
    quantDisplay = <Select className = 'select-quant' placeholder = {'1'} onChange = {changeQuant} options = {quantOptions}/>;
  }

  function changeQuant (e) {
    setQuantC(e.value);
  }

  function addCart () {
    if (quantC > quantA) {
      alert('Not enough stock');
    } else {
      setQuantA(quantA - quantC);
    }
  }

  return (
    <div className = 'Skus'>
      <div className = 'Select'>
      <Select className = 'select-size' placeholder = 'SELECT SIZE' onChange = {changeSize} options = {sizeOptions}/>
      {quantDisplay}
      </div>
      <div className = 'Cart'>
        <button className = 'add-cart' onClick = {addCart} >ADD TO BAG +</button>
        <div className ='add-star' id = 'star-fill'>
        <span class="material-symbols-outlined">grade</span>
        </div>
      </div>

    </div>
  );
}

export default Skus;