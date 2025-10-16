// Página individual do item

// Bibliotecas
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import { Button } from "../../components";

// Api
import api from "../../services/api";

// Estilos
import {
  Container,
  ContainerItem,
  ImagesContainer,
  ImagesArray,
  Image,
  ImagemTop,
  BuyContainer,
  ItemTitle,
  TypeItem,
  PriceContainer,
  PriceBefore,
  PriceItem,
  DeliveryContainer,
  FreeShippingPrice,
  FastShipping,
  FreeShipping,
  StockContainer,
  PaymentContainer,
  BuyButtonContainer,
  QuantityInfo,
  LeftContainer,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionOne,
  Specifications,
  Obs,
  DescriptionTwo,
} from "./style";
import formatCurrency from "../../utils/formatCurrency";

export function Item() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [imgSelected, setImgSelected] = useState();
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");

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

  console.log(windowSize.width);
  // TESTE

  // Buscar produto
  useEffect(() => {
    try {
      const buscarItem = async () => {
        const { data: item } = await api.get(`/items/${id}`);

        setItem(item);
        setImgSelected(item.coverUrl);
      };

      buscarItem();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Mudar imagem
  const changeImgTop = (img, urlImg) => {
    if (img) {
      setImgSelected(item.imagesUrl + img);
    } else {
      setImgSelected(urlImg);
    }
  };

  const quatityValue = (value) => {
    const maxValue = item?.quantity ?? Infinity;
    const orderQuantity = quantitySelected;
    const next = orderQuantity + value;
    if (next <= maxValue && next > 0) {
      setQuantitySelected(next);
      setQuantityInput(String(next));
    } else {
      console.log("quantidade maxima atingida");
    }
  };

  // Permitir digitar a quantidade diretamente no input, validando limites
  const handleQuantityInputChange = (e) => {
    const raw = e.target.value;
    const maxValue = item?.quantity ?? Infinity;

    // Atualiza texto do input imediatamente para permitir apagar e digitar livremente
    setQuantityInput(raw);

    // Só atualiza a quantidade selecionada quando o valor for numérico
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) return;

    const clamped = Math.max(1, Math.min(parsed, maxValue));
    setQuantitySelected(clamped);
  };

  const handleQuantityBlur = () => {
    const maxValue = item?.quantity ?? Infinity;
    const parsed = parseInt(quantityInput, 10);
    const fallback = quantitySelected || 1;
    const value = isNaN(parsed) ? fallback : parsed;
    const clamped = Math.max(1, Math.min(value, maxValue));
    setQuantitySelected(clamped);
    setQuantityInput(String(clamped));
  };
  let objSpec = {};
  if (item) {
    if (item.description[0].specifications) {
      const str = item.description[0].specifications;
      const linhas = str.split("\n");
      linhas.forEach((linha) => {
        const match = linha.match(/"([^"]+):"\s+"([^"]+)"/);
        if (match) {
          const chave = match[1].trim();
          const valor = match[2].trim();
          objSpec[chave] = valor;
        }
      });
    }
  }
  console.log(item);
  const arrayPlanilha = Object.entries(objSpec);
  console.log(arrayPlanilha);

  return (
    <Container>
      {item && (
        <ContainerItem>
          <LeftContainer>
            <ImagesContainer>
              <ImagesArray>
                <Image
                  onClick={() => {
                    changeImgTop(undefined, item.coverUrl);
                  }}
                  src={`${item.coverUrl}`}
                  alt="image"
                />
                {item.images.map((img) => (
                  <Image
                    onClick={() => {
                      changeImgTop(img);
                    }}
                    key={img}
                    src={`${item.imagesUrl + img}`}
                    alt="image"
                  />
                ))}
              </ImagesArray>
              <ImagemTop>
                <img src={`${imgSelected}`} alt="image" />
              </ImagemTop>
            </ImagesContainer>
            <DescriptionContainer>
              <DescriptionTitle>{item.description[0].title}</DescriptionTitle>
              <DescriptionOne>
                {item.description[0].descriptionOne}
              </DescriptionOne>
              {item.description[0].specifications && (
                <table>
                  <tbody>
                    {arrayPlanilha.map((line, index) => (
                      <tr key={index}>
                        <td>{line[0]}</td>
                        <td>{line[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                // <Specifications>

                // </Specifications>
              )}
              {item.description[0].obs && <Obs>{item.description[0].obs}</Obs>}
              {item.description[0].descriptionTwo && (
                <DescriptionTwo>
                  {item.description[0].descriptionTwo}
                </DescriptionTwo>
              )}
            </DescriptionContainer>
          </LeftContainer>
          <BuyContainer>
            <ItemTitle>{item.name}</ItemTitle>
            <TypeItem>Produto Sob Encomenda</TypeItem>

            {item.offer ? (
              <PriceContainer>
                <PriceBefore>{formatCurrency(item.price)}</PriceBefore>
                <PriceItem>
                  {" "}
                  {formatCurrency(item.price_offer)}{" "}
                  <span>
                    {(
                      ((item.price - item.price_offer) / item.price) *
                      100
                    ).toFixed(0)}
                    % Off
                  </span>{" "}
                </PriceItem>
              </PriceContainer>
            ) : (
              <PriceContainer>
                <PriceItem> {formatCurrency(item.price)}</PriceItem>
              </PriceContainer>
            )}
            <DeliveryContainer>
              <FreeShippingPrice>FRETE GRÁTIS ACIMA DE R$ 59</FreeShippingPrice>
              <FastShipping>
                <p>
                  Chegará rápido <span>amanhã</span>
                </p>
                <span>
                  Comprando dentro das próximas <span>2h 20min </span>
                </span>
              </FastShipping>
              <FreeShipping>
                Chegará grátis entre amanhã e sábado{" "}
                <span>Mais detalhes e formas de entrega</span>
              </FreeShipping>
            </DeliveryContainer>
            <StockContainer>
              <p>
                Quantidade
                <div>
                  <button
                    onClick={() => {
                      quatityValue(-1);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantityInput}
                    onChange={handleQuantityInputChange}
                    onBlur={handleQuantityBlur}
                    min={1}
                    max={item?.quantity}
                  />
                  <button
                    onClick={() => {
                      quatityValue(1);
                    }}
                  >
                    +
                  </button>
                </div>
              </p>
              {item.quantity < 11 && item.quantity > 1 ? (
                <QuantityInfo>
                  Apenas {item.quantity} unidades disponíveis
                </QuantityInfo>
              ) : item.quantity === 1 ? (
                <QuantityInfo>
                  Apenas {item.quantity} unidade disponível
                </QuantityInfo>
              ) : (
                <QuantityInfo></QuantityInfo>
              )}
            </StockContainer>

            <PaymentContainer></PaymentContainer>
            <BuyButtonContainer>
              <Button widthTotal={true}>Comprar agora</Button>
              <Button widthTotal={true}>Adicionar ao carrinho</Button>
            </BuyButtonContainer>
          </BuyContainer>
        </ContainerItem>
      )}
    </Container>
  );
}

//  <Container>
//     {item && (
//       <ContainerItem>
//         <ImagesContainer>
//           <ImagesArray>
//             <Image
//               onClick={() => {
//                 changeImgTop(undefined, item.coverUrl);
//               }}
//               src={`${item.coverUrl}`}
//               alt="image"
//             />
//             {item.images.map((img) => (
//               <Image
//                 onClick={() => {
//                   changeImgTop(img);
//                 }}
//                 key={img}
//                 src={`${item.imagesUrl + img}`}
//                 alt="image"
//               />
//             ))}
//           </ImagesArray>
//           <ImagemTop>
//             <img src={`${imgSelected}`} alt="image" />
//           </ImagemTop>
//         </ImagesContainer>
//         <BuyContainer>
//           <ItemTitle>{item.name}</ItemTitle>
//           <TypeItem>Produto Sob Encomenda</TypeItem>

//           {item.offer ? (
//             <PriceContainer>
//               <PriceBefore>{formatCurrency(item.price)}</PriceBefore>
//               <PriceItem>
//                 {" "}
//                 {formatCurrency(item.price_offer)}{" "}
//                 <span>
//                   {(
//                     ((item.price - item.price_offer) / item.price) *
//                     100
//                   ).toFixed(0)}
//                   % Off
//                 </span>{" "}
//               </PriceItem>
//             </PriceContainer>
//           ) : (
//             <PriceContainer>
//               <PriceItem> {formatCurrency(item.price)}</PriceItem>
//             </PriceContainer>
//           )}
//           <DeliveryContainer>
//             <FreeShippingPrice>FRETE GRÁTIS ACIMA DE R$ 59</FreeShippingPrice>
//             <FastShipping>
//               <p>
//                 Chegará rápido <span>amanhã</span>
//               </p>
//               <span>
//                 Comprando dentro das próximas <span>2h 20min </span>
//               </span>
//             </FastShipping>
//             <FreeShipping>
//               Chegará grátis entre amanhã e sábado{" "}
//               <span>Mais detalhes e formas de entrega</span>
//             </FreeShipping>
//           </DeliveryContainer>
//           <StockContainer>
//             <p>
//               Quantidade
//               <div>
//                 <button
//                   onClick={() => {
//                     quatityValue(-1);
//                   }}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={quantityInput}
//                   onChange={handleQuantityInputChange}
//                   onBlur={handleQuantityBlur}
//                   min={1}
//                   max={item?.quantity}
//                 />
//                 <button
//                   onClick={() => {
//                     quatityValue(1);
//                   }}
//                 >
//                   +
//                 </button>
//               </div>
//             </p>
//             {item.quantity < 11 && item.quantity > 1 ? (
//               <QuantityInfo>
//                 Apenas {item.quantity} unidades disponíveis
//               </QuantityInfo>
//             ) : item.quantity === 1 ? (
//               <QuantityInfo>
//                 Apenas {item.quantity} unidade disponível
//               </QuantityInfo>
//             ) : (
//               <QuantityInfo></QuantityInfo>
//             )}
//           </StockContainer>

//           <PaymentContainer></PaymentContainer>
//           <BuyButtonContainer>
//             <Button widthTotal={true}>Comprar agora</Button>
//             <Button widthTotal={true}>Adicionar ao carrinho</Button>
//           </BuyButtonContainer>
//         </BuyContainer>
//         <DescriptionContainer>
//           <h1>teste</h1>
//         </DescriptionContainer>
//       </ContainerItem>
//     )}
//   </Container>
