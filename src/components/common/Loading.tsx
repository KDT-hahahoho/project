/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Lottie from 'react-lottie-player';
import animationJSON from '@assets/Images/LoadingAnimation.json';

const Loading = () => {
  return (
    <div css={Styles}>
      <Lottie className="loadig" animationData={animationJSON} loop play />
    </div>
  );
};

export default Loading;

const Styles = css`
  display: flex;
  flex-direction: column;
  height: 100svh;
  align-items: center;
  justify-content: flex-start;

  .loadig {
    margin: auto 0;
    transform: translateY(-2rem);
  }
`;
