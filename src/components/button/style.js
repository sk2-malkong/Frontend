import styled, {css} from "styled-components";

const variantCSS = {
  primary : css`
    background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  sub : css`
    background-color: ${({theme}) => theme.PALLETE.primary["sub"]};
  `,
  white : css`
    background-color: ${({theme}) => theme.PALLETE.primary["white"]};
  `,
  black : css`
    background-color: ${({theme}) => theme.PALLETE["black"]};
  `
};

const borderCSS = {
  primary : css`
    border: solid 1px ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  sub : css`
    border: solid 1px ${({theme}) => theme.PALLETE.primary["sub"]};
  `,
  gray100 : css`
    border: solid 1px ${({theme}) => theme.PALLETE.gray["100"] };
  `,
  gray200 : css`
    border: solid 1px ${({theme}) => theme.PALLETE.gray["200"] };
  `,
  gray300 : css`
    border: solid 1px ${({theme}) => theme.PALLETE.gray["300"] };
  `
};

const colorCSS = {
  primary : css`
    color: ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  sub : css`
    color: ${({theme}) => theme.PALLETE.primary["sub"]};
  `,
  white : css`
    color: ${({theme}) => theme.PALLETE["white"]};
    `,
  black : css`
    color: ${({theme}) => theme.PALLETE["black"]};
  `,
  gray100 : css`
    color: ${({theme}) => theme.PALLETE.gray["100"] };
  `,
  gray200 : css`
    color: ${({theme}) => theme.PALLETE.gray["200"] };
  `,
  gray300 : css`
    color: ${({theme}) => theme.PALLETE.gray["300"] };
  `
};

const shapeCSS = {
  default: css``,
  small : css`
    border-radius: 5px;
  `,
  round : css`
    border-radius: 50%;
  `,
}

const sizeCSS = {
  small : css`
    height: 55px;
    padding: 16px 0;
  `,
}

const fontCSS = {
  h1 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h1"]};
    line-height: ${({theme}) => theme.FONT_LINE["h1"]};
  `,
  h2 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h2"]};
    line-height: ${({theme}) => theme.FONT_LINE["h2"]};
  `,
  h3 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h3"]};
    line-height: ${({theme}) => theme.FONT_LINE["h3"]};
  `,
  h4 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h4"]};
    line-height: ${({theme}) => theme.FONT_LINE["h4"]};
  `,
  h5 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h5"]};
    line-height: ${({theme}) => theme.FONT_LINE["h5"]};
  `,
  h6 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h6"]};
    line-height: ${({theme}) => theme.FONT_LINE["h6"]};
  `,
  h7 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h7"]};
    line-height: ${({theme}) => theme.FONT_LINE["h7"]};
  `,
  h8 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h8"]};
    line-height: ${({theme}) => theme.FONT_LINE["h8"]};
  `,
  h9 : css`
    font-size: ${({theme}) => theme.FONT_SIZE["h9"]};
    line-height: ${({theme}) => theme.FONT_LINE["h9"]};
  `,
}

const Button = styled.button`
  ${({variant}) => variantCSS[variant]};
  ${({shape}) => shapeCSS[shape]};
  ${({size}) => sizeCSS[size]};
  ${({border}) => borderCSS[border]};
  ${({color}) => colorCSS[color]};
  ${({font}) => fontCSS[font]};
`

export default Button;