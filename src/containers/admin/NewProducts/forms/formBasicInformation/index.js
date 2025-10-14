// Bibliotecas
import React, { useEffect, useState, useCallback } from "react";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cropper from "react-easy-crop";

// Estilo
import {
  Label,
  Input,
  LabelUpload,
  LabelUploadImages,
  InputWrap,
  SelectWrap,
  UploadsContainer,
} from "./style";
import FormProgress from "../../../../../components/FormProgress";
import AnimatedBorder from "../../../../../components/AnimatedBorder";
import { components } from "react-select";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";

//API
import api from "../../../../../services/api";
import { waitFor } from "@testing-library/dom";

export const FormBasicInformation = ({ onDataChange, formValue, goBackForm }) => {
  const formObject = {
    name: "",
    categories: [],
    file: [],
    images: [],
  };

  const [imagesCount, setImagesCount] = useState(0);
  const [coverName, setCoverName] = useState(null);
  const [imagesName, setImagesName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stateFormData, setStateFormData] = useState(formObject);
  // Estados do cropper
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Validação yup
  const schema = Yup.object().shape({
    name: Yup.string().required("Digite o nome do produto"),
    categories: Yup.array()
      .min(1, "Selecione pelo menos uma categoria")
      .required("Escolha pelo menos uma categoria"),
    file: Yup.mixed() // podemos validar o campo file com o mexed(), e os test() para realizar teste nos arquivos
      .test("required", "Carregue um arquivo", (value) => {
        return value?.length > 0;
      })
      .test("tamanhoArquivo", "A imagem deve conter até 2MB", (value) => {
        if (!value || value.length === 0) return true; // deixa o teste passar quando não há arquivo; o teste 'required' cuida disso
        return value?.[0]?.size <= 2000000;
      })
      .test("tipoArquivo", "O arquivo deve ser PNG ou JPEG", (value) => {
        if (!value || value.length === 0) return true;
        const type = value?.[0]?.type;
        return type === "image/jpeg" || type === "image/png";
      }),
  });

  const onSubmit = (data) => {
    const imagens = Array.from(data.images);

    setStateFormData((prev) => ({
      ...prev,
      name: data.name,
      categories: data.categories,
      file: data.file[0],
      images: imagens,
    }));
  };

  useEffect(() => {
    if (
      stateFormData.name === "" ||
      stateFormData.categories.length === 0 ||
      stateFormData.file.length === 0
    ) {
    } else {
      onDataChange(stateFormData);
    }
  }, [stateFormData]);

  // Buscar categorias na api
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      if (formValue?.categories && formValue.categories.length > 0) {
        setSelectedCategories(formValue.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseForms
  const {
    register,
    handleSubmit,
    watch,
    control, // para componentes externos e controlados
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema), // usa o yup para validar os erros
    defaultValues: {
      name: formValue?.name ?? "",
      categories: formValue?.categories ?? [],
    },
  });

  // Registra o campo 'file' no react-hook-form sem input visível
  useEffect(() => {
    register("file");
  }, [register]);

  // Inicializar campos com valores antigos (persistência)
  useEffect(() => {
    if (formValue) {
      if (typeof formValue.name === "string") {
        setValue("name", formValue.name, { shouldDirty: false });
      }
      if (formValue.file) {
        try {
          const dt = new DataTransfer();
          dt.items.add(formValue.file);
          setValue("file", dt.files, { shouldValidate: false });
          setCoverName(formValue.file.name || "capa.png");
        } catch (e) {}
      }
      if (formValue.images && formValue.images.length > 0) {
        try {
          const dtImgs = new DataTransfer();
          formValue.images.forEach((img) => dtImgs.items.add(img));
          setValue("images", dtImgs.files, { shouldValidate: false });
          setImagesCount(formValue.images.length);
        } catch (e) {}
      }
    }
  }, [formValue, setValue]);

  // Utilitários de recorte
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrcParam, cropParam) => {
    const image = await createImage(imageSrcParam);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { width, height, x, y } = cropParam;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
    setSelectedCategories(updatedCategories);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormProgress current={1} />

      <h2>Adicionar Novo Produto</h2>

      <div>
        <Label>Nome do Produto</Label>
        <InputWrap>
          <Input
            type="text"
            {...register("name")}
            placeholder="Digite o nome do produto"
          />
          <AnimatedBorder rx={12} ry={12} />
        </InputWrap>
        <ErroMessage>{errors.name?.message}</ErroMessage>
      </div>

      <UploadsContainer>
        <div>
          <Label>Capa do Produto</Label>
          <LabelUpload>
            <AnimatedBorder rx={12} ry={12} />
            {coverName || (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L12 8"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L12 8 15 11"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 16L16 22"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 19L16 22 13 19"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Carregue a capa do produto
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  setImageSrc(reader.result);
                  setShowCropper(true);
                  setCoverName(file.name);
                };
                reader.readAsDataURL(file);
              }}
            />
          </LabelUpload>
          <ErroMessage>{errors.file?.message}</ErroMessage>
        </div>

        {showCropper && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: 600,
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: 400 }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div
                style={{
                  padding: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <label style={{ fontSize: 14 }}>Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
                <Button
                  type="button"
                  style={{ backgroundColor: "#ffe9e9ff" }}
                  onClick={() => {
                    setShowCropper(false);
                    setImageSrc(null);
                    setCroppedAreaPixels(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  style={{ backgroundColor: "#dbeafe" }}
                  onClick={async () => {
                    if (!imageSrc || !croppedAreaPixels) return;
                    try {
                      const croppedBlob = await getCroppedImg(
                        imageSrc,
                        croppedAreaPixels
                      );
                      const croppedFile = new File(
                        [croppedBlob],
                        coverName || "cover.png",
                        { type: croppedBlob.type || "image/png" }
                      );
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(croppedFile);
                      const fileList = dataTransfer.files;
                      setValue("file", fileList, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setShowCropper(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Salvar recorte
                </Button>
              </div>
            </div>
          </div>
        )}

        <div>
          <Label>Imagens do Produto</Label>
          <LabelUploadImages>
            <AnimatedBorder rx={8} ry={8} />
            {imagesCount > 0 ? (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {imagesCount}{" "}
                {imagesCount === 1
                  ? "Arquivo carregado"
                  : "Arquivos carregados"}
              </>
            ) : (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L12 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L12 8 15 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 16L16 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 19L16 22 13 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Carregue as imagens do produto
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpg"
              multiple
              {...register("images")}
              onChange={(value) => {
                const files = value.target.files;
                setImagesCount(files.length);
              }}
            />
          </LabelUploadImages>
          <ErroMessage>{errors.file?.message}</ErroMessage>
        </div>
      </UploadsContainer>

      <div>
        <Label>Categorias</Label>
        {/* Esse controller serve para comportar componentes controlados , o ReactSelect é um componente controlado forasteiro, então ele precisa dessa estrutura adicional do reactUseForm  */}
        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value } }) => {
            // Estilos claros e minimalistas
            const customStyles = {
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "12px",
                padding: "4px",
                boxShadow: "none",
                color: "#111",
                minHeight: "45px",
                "&:hover": {
                  borderColor: "transparent",
                },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#f2f2f2"
                  : state.isFocused
                  ? "#fafafa"
                  : "#fff",
                color: "#111",
                padding: "10px 15px",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "visible",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#eef2ff",
                borderRadius: "6px",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#1a56db",
                fontWeight: 500,
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#1a56db",
                "&:hover": {
                  backgroundColor: "#1a56db",
                  color: "white",
                },
              }),
              input: (base) => ({ ...base, color: "#111" }),
              placeholder: (base) => ({ ...base, color: "#888" }),
              singleValue: (base) => ({ ...base, color: "#111" }),
            };

            // Menu customizado com borda animada
            const CustomMenu = (props) => {
              const [animate, setAnimate] = React.useState(false);
              React.useEffect(() => {
                const t = setTimeout(() => setAnimate(true), 10);
                return () => clearTimeout(t);
              }, []);
              return (
                <components.Menu {...props}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <AnimatedBorder rx={12} ry={12} active={animate} />
                    {props.children}
                  </div>
                </components.Menu>
              );
            };

            // Opção customizada com borda animada no hover
            const CustomOption = (props) => {
              const [hover, setHover] = React.useState(false);
              const { isFocused, isSelected, children } = props;
              const active = hover;
              return (
                <components.Option {...props}>
                  <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                      padding: "10px 15px",
                      background: isSelected
                        ? "#f2f2f2"
                        : isFocused
                        ? "#fafafa"
                        : "#fff",
                      color: "#111",
                    }}
                  >
                    <AnimatedBorder rx={12} ry={12} active={active} />
                    {children}
                  </div>
                </components.Option>
              );
            };

            return (
              <SelectWrap>
                <ReactSelect
                  isMulti
                  value={selectedCategories}
                  onChange={(selected) => {
                    onChange(selected);
                    handleCategoryChange(selected);
                  }}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder={"Selecione as categorias"}
                  styles={customStyles}
                  components={{ Menu: CustomMenu, Option: CustomOption }}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
                <AnimatedBorder rx={12} ry={12} />
              </SelectWrap>
            );
          }}
        />
        <ErroMessage>{errors.categories?.message}</ErroMessage>
      </div>

      <Button
        widthTotal="true"
        type="submit"
        style={{
          marginTop: "30px",
          height: "50px",
        }}
      >
        Próxima Etapa
      </Button>
    </form>
  );
};
