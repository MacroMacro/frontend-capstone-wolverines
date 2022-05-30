// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// function ComparisonModal ({closeModal, parentProduct, compareProduct, combinedFeatures}) {

//   function closeModal = (event) => {
//     event.stopPropagation();
//     closeModal();
//   };

//   return (
//     <ModalWrapper
//       className="modal"
//       onClick={closeModal}
//     >
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//       </div>
//       <ModalContent>
//         <ComparisonTitle>
//           <CompareTitle>COMPARING</CompareTitle>
//           <div>{null}</div>
//           <div>{null}</div>
//           <ProductTitle><b>{parentProduct}</b></ProductTitle>
//           <div>{null}</div>
//           <ProductTitle><b>{compareProduct}</b></ProductTitle>
//         </ComparisonTitle>
//         <CompareWrapper>
//           {combinedFeatures.map((feature, i) => {
//             if (feature) {
//               if (feature[0] === '"') {
//                 const cleanFeature = feature.substring(1, feature.length - 1);
//                 return <TestDiv key={i}>{cleanFeature}</TestDiv>;
//               }
//               return <TestDiv key={i}>{feature}</TestDiv>;
//             }
//             return <TestDiv key={i}>{feature}</TestDiv>;
//           })}
//         </CompareWrapper>
//       </ModalContent>
//     </ModalWrapper>
//   );
// };

import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ComparisonModal = (props) => {
  const closeModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  const { parentProduct, compareProduct, combinedFeatures } = props;

  return (
    <ModalWrapper
      className="modal"
      onClick={closeModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      </div>
      <ModalContent>
        <ComparisonTitle>
          <CompareTitle>COMPARING</CompareTitle>
          <div>{null}</div>
          <div>{null}</div>
          <ProductTitle><b>{parentProduct}</b></ProductTitle>
          <div>{null}</div>
          <ProductTitle><b>{compareProduct}</b></ProductTitle>
        </ComparisonTitle>
        <CompareWrapper>
          {combinedFeatures.map((feature, i) => {
            if (feature) {
              if (feature[0] === '"') {
                const cleanFeature = feature.substring(1, feature.length - 1);
                return <TestDiv key={i}>{cleanFeature}</TestDiv>;
              }
              return <TestDiv key={i}>{feature}</TestDiv>;
            }
            return <TestDiv key={i}>{feature}</TestDiv>;
          })}
        </CompareWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

const TestDiv = styled.div`
  text-align: center;
  font-size: 17px;
`;
const ProductTitle = styled.div`
  text-align: center;
  font-size: 17px;
  border-bottom: 1px solid grey;
  margin-bottom: 13px;
`;

const CompareTitle = styled.div`
  margin: 30px 10px;
  font-size: 15px;
`;

const CompareWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 30px;
  overflow: auto;
  justify-items: center;
  position: relative;
  z-index: 150;
`;

const ComparisonTitle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows:
  justify-items: center;
  align-items: center;
  font-size: 15px;
  background-color: white;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
background-color: white;
width: 75%; /* Width in proportion to its parent container*/
max-width: 600px; /* Max width where it stops expanding */
height: 35%; /* Height in proportion to its parent container */
margin: auto; /* Auto margin according to the element width */
justify-content: center;
align-items: center;
padding: 10px;
border: 1px solid black;
border-radius: 20px; /* Optional. Rounds container corners */
overflow: auto;
`;

const ModalWrapper = styled.div`
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Overlay effect: translucent background: black w/ partial opacity */
background: rgba(0,0,0,0.55);
z-index: 1; /* Overlay effect: positioned over other containers */
width: 100%; /* Full width */
height: 100%; /* Full height */
position: fixed; /* Fix position on the top-left corner*/
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
overflow: auto; /* Enable scroll if needed */
padding-top: 80px; /* Location of the content container */
font-size: calc(10px + 2vmin);
color: black;
z-index: 1000;
backdrop-filter: blur(8px) contrast(70%);
`;


export default ComparisonModal;