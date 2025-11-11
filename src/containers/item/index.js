// Página individual do item

// Bibliotecas
import React, { useEffect, useState } from "react";

// Estilos
import { Container } from "./style";

// Telas
import ItemPc from "./itemPc";
import ItemMobile from "./itemMobile";

export function Item() {
  const [breakpoints, setBreakPoints] = useState(0);
  const isMobile = false;

  // TESTE
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // adiciona o listener
    window.addEventListener("resize", handleResize);

    // limpa o listener quando o componente desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width > 1200 && breakpoints !== 0) {
    setBreakPoints(0);
  } else if (
    windowSize.width < 1200 &&
    windowSize.width > 1000 &&
    breakpoints !== 1
  ) {
    setBreakPoints(1);
  } else if (
    windowSize.width < 1000 &&
    windowSize.width > 900 &&
    breakpoints !== 2
  ) {
    setBreakPoints(2);
  } else if (windowSize.width < 900 && breakpoints !== 3) {
    setBreakPoints(3);
  }

  return (
    <Container>
      {breakpoints >= 3 && isMobile === true ? (
        <ItemMobile breakpoints={breakpoints} />
      ) : (
        <ItemPc breakpoints={breakpoints} />
      )}
    </Container>
  );
}
