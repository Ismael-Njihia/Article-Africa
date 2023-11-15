import React from 'react'
import {css} from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Spinner = () => {
  return (
    <BeatLoader color={'#2A9404'} loading={true} css={override} size={30} />
  );
};

export default Spinner