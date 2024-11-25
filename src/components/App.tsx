import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { ImageModalData, ImgData } from "../type";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [photos, setPhotos] = useState<ImgData["results"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageModalData | null>(null);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      right: "auto",
      bottom: "auto",
      border: "none",
      borderRadius: "8px",
      padding: "0",
    },
  };

  const onSubmit = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setCurrentPage(1);
    setPhotos(null); //?? був []
  };

  const modalOpen = (photo: ImageModalData) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };
  const modalClose = () => {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchValue === "") return;
        setIsLoading(true);

        const { data }: { data: ImgData } = await axios.get(
          `https://api.unsplash.com/search/photos/?page=${currentPage}&query=${searchValue}&client_id=fpSjF5C1C_6DY-z_mUhmp2TbTEtQjTmZ8IDLv9cUjyY`
        );
        setTotalPage(data.total_pages);

        setPhotos((prevPhotos) => {
          if (prevPhotos) {
            return [...prevPhotos, ...data.results];
          } else {
            return [...data.results];
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          return "An unknown error occurred";
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchValue, currentPage]);

  const loadMoreImage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {photos !== null && (
        <ImageGallery photos={photos} modalOpen={modalOpen} />
      )}
      {photos !== null && currentPage < totalPage && (
        <LoadMoreBtn loadMoreImage={loadMoreImage} />
      )}
      {selectedPhoto && (
        <ImageModal
          isOpen={modalIsOpen}
          photo={selectedPhoto}
          modalClose={modalClose}
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default App;
