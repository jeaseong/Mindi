import styled from 'styled-components';

export const EIResultTemplate = styled.section`
  width: 100vw;
  margin: 0 auto;
  height: 100vh;

  ${({ theme }) => theme.media.tablet`
    max-width: 1024px;
    flex-direction: row;

  `}
`;

export const ImageWrapper = styled.div`
  margin: 2em auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ScoreWrapper = styled.div`
  position: absolute;
`;

export const ScoreTitle = styled.span``;

export const Score = styled.span`
  display: block;
  font-size: 5.5em;
`;

export const DescriptionWrapper = styled.div`
  margin: 0 auto 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Description = styled.p`
  line-height: 25px;
  margin-left: 2em;
  text-align: center;
`;

export const ArrowContainer = styled.div`
  position: absolute;
  right: 32em;
  bottom: 20em;
  width: 65px;
  height: 65px;
  /* background-color: wheat; */
  transform: rotate(135deg);
`;

export const ArrowHead = styled.div`
  width: 7px;
  height: 7px;
  border: solid;
  border-width: 1px 0 0 1px;
  /* background-color: thistle; */
`;

export const ArrowTail = styled.div`
  width: 200px;
  height: 1px;
  background-color: black;
  position: absolute;
  transform: rotate(45deg);
  transform-origin: left;
  left: 0;
  top: 0;
`;
