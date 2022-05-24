import React, { useState } from 'react';
import Select from 'react-select';

function Skus ({skus}) {
  const [display, setDisplay] = useState();
  const [quantA, setQuantA] = useState(10);
  const [quantC, setQuantC] = useState(0);
  const [sizeA, setSizeA] = useState(0);
  const [sizeC, setSizeC] = useState(0);


  function changeSize (e) {
    setQuantA(skus[e.value]['quantity']);
    setSizeC(skus[e.value]['size']);
  }

  const sizeOptions = [];
  Object.keys(skus).map((key) => sizeOptions.push({'value': key, 'label': skus[key]['size']}));

  var quantDisplay;
  if (quantA > 0) {
    const quantOptions = Array.from({length: quantA}, (_, i) => {return ({'value': i+1, 'label': i+1})});
    quantDisplay = <Select className = 'select-quant' onChange = {changeQuant} options = {quantOptions}/>;
  } else {
    quantDisplay = <div className = 'select-quant'>Not Available</div>;
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
    <div>
      <Select className = 'select-size' placeholder = 'SELECT SIZE' onChange = {changeSize} options = {sizeOptions}/>

      <div>
        <button onClick = {addCart} >ADD TO BAG +</button>
      </div>
      {quantDisplay}
    </div>
  );
}

export default Skus;