import React from 'react';
import styled from 'styled-components';

export default function Fourth() {

  let Block = styled.div`
  display: block;
  position: relative;
  width: 30%;
  height: 10vh;
  background-color: rgb(235, 159, 19); 
  border: none;
  color: white;
  margin: 1em;
  `
  let Text = styled.p`
  text-align: center;
  line-height: 75px;
  `

  return (
    <Block>
      <Text>Fourth</Text>
    </Block>
  );
}