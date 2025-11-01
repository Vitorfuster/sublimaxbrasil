// Página individual do item

// Bibliotecas
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineArrowTurnDownRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// Components
import Stars from "./components/Stars";
import QuestionsContainer from "./components/Questions";
import ReviewsContainer from "./components/reviews";
import FreteContainer from "./components/Delivery";
import { ButtonClean } from "../../components";
import LoginModal from "../../components/LoginModal";

// Api
import api from "../../services/api";

// Hooks
import { useUser } from "../../hooks/UserContext";

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
  VendidosSpan,
  ContainerScore,
  ScoreText,
  ReviewsText,
  OpenQuestionsWindow,
  WindowContainer,
  TitleYourQuestion,
  YourQuestionsContainer,
  YourQuestions,
} from "./style";
import formatCurrency from "../../utils/formatCurrency";

export function Item() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState();
  const [page, setPage] = useState();
  const [stars, setStars] = useState();
  const [imgSelected, setImgSelected] = useState({});
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [openQuestionWindow, setOpenQuestionWindow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [freteAndTicket, setFreteAndTicket] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  // const [reviews, setReviews] = useState([]);

  // Hook buscar usuário localStorage
  const { userData } = useUser();

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
        setImgSelected({ url: item.coverUrl, id: "A" });

        // Detalhes do produto

        const { data: itemInformations } = await api.get(
          `/item-controller/${id}`
        );
        setPage(itemInformations);

        setQuestions(itemInformations.questions);

        // Score stars product
        if (itemInformations.informations) {
          const starsScore =
            itemInformations.informations.score /
            itemInformations.informations.reviews;
          setStars(starsScore);
        }
      };

      buscarItem();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Mudar imagem
  const changeImgTop = (img, urlImg, id) => {
    if (img) {
      setImgSelected({ url: item.imagesUrl + img, id: id });
    } else {
      setImgSelected({ url: urlImg, id: id });
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
  // document.body.style.overflow = "hidden";

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
  const arrayPlanilha = Object.entries(objSpec);

  const itsOpen = (value) => {
    if (value) {
      setOpenQuestionWindow(true);
      document.body.style.overflow = "hidden";
    } else {
      setOpenQuestionWindow(false);

      document.body.style.overflow = "";
    }
  };

  // Botão submit comprar agora
  const buyNow = async () => {
    // Verificar se user esta logado
    if (!userData.id) {
      setLoginOpen(true);
    }
    // verificar se user já preencheu as informações de contato para renderizar os forms
    if (userData.id) {
      const pedido = {
        item: item,
        quantity: quantitySelected,
        freteAndTicket: freteAndTicket,
      };

      localStorage.setItem("sublimaxBrasil:order", JSON.stringify(pedido));

      navigate("/checkoutbuy");
    }
  };

  return (
    <Container>
      {item && page && (
        <ContainerItem>
          <LeftContainer>
            <ImagesContainer>
              <ImagesArray>
                <Image
                  onClick={() => {
                    changeImgTop(undefined, item.coverUrl, "A");
                  }}
                  onSelected={imgSelected.id === "A"}
                  src={`${item.coverUrl}`}
                  alt="image"
                />
                {item.images.map((img, index) => (
                  <Image
                    onClick={() => {
                      changeImgTop(img, undefined, index);
                    }}
                    onSelected={imgSelected.id === index}
                    key={img}
                    src={`${item.imagesUrl + img}`}
                    alt="image"
                  />
                ))}
              </ImagesArray>
              <ImagemTop>
                <img src={`${imgSelected.url}`} alt="image" />
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
            <QuestionsContainer
              idProduct={id}
              allQuestions={page.questions}
              questionsOpen={(value) => {
                itsOpen(value);
              }}
            />

            <ReviewsContainer
              userReviews={{ score: stars, reviews: page?.reviews }}
            />
          </LeftContainer>
          <BuyContainer>
            {page.informations && page.informations.purchased < 10 ? (
              <VendidosSpan>
                novo <span>| {page.informations.purchased} vendidos</span>
              </VendidosSpan>
            ) : page.informations && page.informations.purchased >= 10 ? (
              <VendidosSpan>
                novo <span>+{page.informations.purchased} vendidos</span>
              </VendidosSpan>
            ) : (
              <VendidosSpan>novo</VendidosSpan>
            )}

            <ItemTitle>{item.name}</ItemTitle>
            {page.informations && page.informations.reviews > 0 ? (
              <ContainerScore>
                <ScoreText
                  highScore={
                    page.informations.purchased > 100 &&
                    page.informations.reviews > 70
                  }
                >
                  {stars.toFixed(1)}
                </ScoreText>
                <Stars score={stars} />
                <ReviewsText
                  highScore={
                    page.informations.purchased > 100 &&
                    page.informations.reviews > 70
                  }
                >
                  ({page.informations.reviews})
                </ReviewsText>
              </ContainerScore>
            ) : (
              <h2>olaaa</h2>
            )}

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
            <FreteContainer
              freteAndTicket={(value) => {
                setFreteAndTicket(value);
              }}
              quantity={quantitySelected}
            />
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
              <ButtonClean
                onClick={() => {
                  buyNow();
                }}
                widthTotal={true}
              >
                Comprar agora
              </ButtonClean>
              <ButtonClean widthTotal={true} ButtonOp={true}>
                Adicionar ao carrinho
              </ButtonClean>
            </BuyButtonContainer>
          </BuyContainer>
        </ContainerItem>
      )}
      {openQuestionWindow && (
        <OpenQuestionsWindow onClick={() => itsOpen(false)}>
          <WindowContainer onClick={(e) => e.stopPropagation()}>
            <TitleYourQuestion>
              perguntas
              <button onClick={() => itsOpen(false)}>
                <IoMdClose />
              </button>
            </TitleYourQuestion>

            {questions &&
              questions.map((line, index) => (
                <YourQuestionsContainer key={index}>
                  <YourQuestions answered={line.answer !== null}>
                    <p>{line.questions}</p>
                    {line.answer && (
                      <div>
                        <HiOutlineArrowTurnDownRight className="iconStyle" />
                        <p>{line.answer}</p>
                      </div>
                    )}
                  </YourQuestions>
                </YourQuestionsContainer>
              ))}
          </WindowContainer>
        </OpenQuestionsWindow>
      )}
      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
        }}
        userModalLog={() => {
          buyNow();
        }}
      />
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
