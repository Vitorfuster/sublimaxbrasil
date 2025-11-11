import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    /* 🎨 Cores */
    --colorT0: #fff;
    --colorT1: #000;
    --colorT2: #292929ff;
    --colorT3: #555555ff;
    --colorT4: #4d4d4dff;
    --colorT5: #8a8a8aff;
    --colorT6: #999999ff;
    --colorT7: #c0c0c0ff;
    --colorT8: #d8d8d8ff;
    --colorT9: #dfdfdfff;
    --colorD1: #0098fdff;
    --colorD1a:rgba(0, 112, 187, 1);
    --colorD2: #00c3ffff;
    --colorD2a: #0011ff1f;
    --colorD2b: #0011ff2d;
    --colorD3: #a80000ff;
    --colorD4: #ff4f4fff;
    --colorD5: #00d312ff;
    --colorBg1: #fff;
    --colorBg2: #fffdf5ff;
    --colorBg3: #fffdf5ff;
    --colorBg4: #fffdf5ff;
    --colorBg5: #fffdf5ff;
    --color-text: #111827;

    /* 🔠 Fontes e tamanhos */
    --fsPP: 0.8rem;
    --fsP: 0.9rem;
    --fsM: 1rem;
    --fsMM: 1.2rem;
    --fsG: 1.3rem;
    --fsGG: 1.5rem;
    --fsX: 2rem;
    --fsXX: 2.3rem;

@media (max-width: 1200px) {
      --fsPP: 0.6rem;
    --fsP: 0.7rem;
    --fsM: 0.8rem;
    --fsMM: 1rem;
    --fsG: 1.1rem;
    --fsGG: 1.3rem;
    --fsX: 1.8rem;
    --fsXX: 2.1rem;
}

@media (max-width: 800px) {
      --fsPP: 0.6rem;
    --fsP: 0.7rem;
    --fsM: 0.8rem;
    --fsMM: 0.9rem;
    --fsG: 1rem;
    --fsGG: 1.1rem;
    --fsX: 1.7rem;
    --fsXX: 1.9rem;
}


    /* 📱 Breakpoints */
    --breakpoint-mobile: 480px;
    --breakpoint-tablet: 768px;
    --breakpoint-desktop: 1280px;
  }

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
   outline: none;
}

img {
  max-width: 100%
}

ul {
  list-style: none;
  margin: 0px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;
