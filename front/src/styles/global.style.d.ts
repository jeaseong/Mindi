import 'styled-components';

export interface Sizes {
  mobile: number;
  tablet: number;
  desktop: number;
}
export type BackQuoteArgs = [TemplateStringsArray];

// 반응형 css Props을 만들어주는 object를 선언함
export interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: Sizes;
    media: Media;
    colors: {
      basicBlack: string;
      basicWhite: string;
      bgColor: string;
      headerBgColor: string;
      btnColor: string;
      btnColorHover: string;
      sucessAlert: string;
      errorAlert: string;
      postingGreen: string;
      postingRed: string;
    };
  }
}
