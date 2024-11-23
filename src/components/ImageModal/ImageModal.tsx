import { FC } from "react";
import Modal from "react-modal";
import { ImageModalPrors } from "../../type";

Modal.setAppElement("#root");

const ImageModal: FC<ImageModalPrors> = ({
  isOpen,
  photo,
  customStyles,
  modalClose,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={modalClose}
        contentLabel="Image Modal"
        style={customStyles}
      >
        <img src={photo.urls.regular} alt={photo.alt_description} />
      </Modal>
    </div>
  );
};

export default ImageModal;
