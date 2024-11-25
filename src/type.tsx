export interface initialValues {
  searchTerm: string;
}

export interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
}




export interface ImgData {
  results: Results[];
  total: number;
  total_pages: number;
}
export interface Results {
  [key: string]: ImageCardProps;
}

export interface ImageGalleryProps {
  photos: ImgData['results'] | null;
  modalOpen: (imageModalData: ImageModalData) => void;
}



export interface ImageModalData {
  alt_description: string;
  urls: {
    regular: string;
  };
}
export interface ImageModalPrors {
  photo: ImageModalData;
  isOpen: boolean;
  customStyles: object;
  modalClose: () => void;
}



export interface ImageCardProps {
  image: string;
  description: string;
  onClick: () => void;
}



export interface LoadMoreBtnProps {
  loadMoreImage: () => void;
}