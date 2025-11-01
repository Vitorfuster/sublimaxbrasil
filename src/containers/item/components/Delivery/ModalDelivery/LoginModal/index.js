// Bibliotecas
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Estilos
import { Over, ModalBox } from "./style";

// Componentes
import { Register } from "./pages/register";
import { Login } from "./pages/login";

export default function Modal({ open, onClose, userModalLog }) {
  const [renderPage, setRenderPage] = useState(1);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // trava scroll
    } else {
      document.body.style.overflow = ""; // libera scroll
    }

    return () => {
      document.body.style.overflow = ""; // garante liberar ao desmontar
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <Over onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {renderPage && renderPage === 1 ? (
          <Login
            renderPage={(pg) => {
              setRenderPage(pg);
            }}
            onClose={() => {
              onClose();
            }}
            userModalLog={() => {
              userModalLog();
            }}
          />
        ) : (
          <Register
            renderPage={(pg) => {
              setRenderPage(pg);
            }}
            onClose={() => {
              onClose();
            }}
            userModalLog={() => {
              userModalLog();
            }}
          />
        )}
      </ModalBox>
    </Over>,
    document.getElementById("modal-root")
  );
}
