import React from "react";
// icones
import { FaStar } from "react-icons/fa6"; // Estrla cheia
import { FaRegStarHalfStroke } from "react-icons/fa6"; // Meia estrela
import { FaRegStar } from "react-icons/fa6"; // Estrela vazia

// Estilo
import { StarContainer } from "./style";

function Stars({ score }) {
  return (
    <StarContainer>
      {score && score > 0 && score < 0.5 ? (
        <div>
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 0.5 && score < 1 ? (
        <div>
          <FaRegStarHalfStroke
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 1 && score < 1.5 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 1.5 && score < 2 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />

          <FaRegStarHalfStroke
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />

          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 2 && score < 2.5 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 2.5 && score < 3 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />

          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStarHalfStroke
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 3 && score < 3.5 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 3.5 && score < 4 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStarHalfStroke
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 4 && score < 4.5 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : score >= 4.5 && score < 5 ? (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaRegStarHalfStroke
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      ) : (
        <div>
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
          <FaStar
            style={{
              color: "blue",
              fontSize: "1.6rem",
            }}
          />
        </div>
      )}
    </StarContainer>
  );
}

export default Stars;
