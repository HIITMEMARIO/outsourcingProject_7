import { createGlobalStyle } from 'styled-components';
import ONEMobileOTFRegular from '../._ONE Mobile OTF Regular';

const createGlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'ONE-Mobile-POP';
    src: url(${ONEMobileOTFRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
}
`;

export default createGlobalStyle;
