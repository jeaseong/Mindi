import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      basic: string;
      bgColor: string;
    };
  }
}
