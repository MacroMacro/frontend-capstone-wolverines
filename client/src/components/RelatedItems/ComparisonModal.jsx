import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ComparisonModal = (props) => {
  const closeScreen = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  const { parentProduct, compareProduct, combinedFeatures } = props;

  return (
    <ModalTable
      onClick={closeScreen}
    >
      <div onClick={(e) => e.stopPropagation()}>
      </div>
      <ModalInfo>
        <Title>
          <div>{null}</div>
          <CompareTitle>COMPARING</CompareTitle>
          <div>{null}</div>
          <FeatureTitles><b>{parentProduct}</b></FeatureTitles>
          <div>{null}</div>
          <FeatureTitles><b>{compareProduct}</b></FeatureTitles>
        </Title>
        <FeatureComparisons>
          {combinedFeatures.map((feature, i) => {
            if (feature) {
              if (feature[0] === '') {
                const features = feature.substring(1, feature.length - 1);
                return <Features key={i}>{features}</Features>;
              }
              return <Features key={i}>{feature}</Features>;
            }
            return <Features key={i}>{feature}</Features>;
          })}
        </FeatureComparisons>
      </ModalInfo>
    </ModalTable>
  );
};

const Features = styled.div`
  text-align: center;
  font-size: 18px;
`;
const FeatureTitles = styled.div`
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid grey;
  margin-bottom: 13px;
`;

const CompareTitle = styled.div`
  margin: 20px 10px;
  font-size: 24px;
  text-align: center;
`;

const FeatureComparisons = styled.div`
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

const Title = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows:
  justify-items: center;
  align-items: center;
  font-size: 15px;
  background-color: white;
  margin-bottom: 10px;
`;

const ModalInfo = styled.div`
background-color: white;
width: 100%;
max-width: 600px;
height: 50%
margin: auto
justify-content: center;
align-items: center;
padding: 10px;
border: 1px solid black;
border-radius: 20px;
overflow: auto;
`;

const ModalTable = styled.div`
background-color: rgba(0,0,0,0.6);
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
display: flex;
justify-content: center;
align-items: center;
overflow: auto;
padding-top: 50px;
padding-bottom: 50px;
font-size: 18px;
color: black;
z-index: 7000;
backdrop-filter: blur(8px) contrast(70%);
`;
ModalInfo.displayName = 'modal';


export default ComparisonModal;