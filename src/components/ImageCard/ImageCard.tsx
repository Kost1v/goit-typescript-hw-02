import { ImageCardProps } from "../../type";


const ImageCard: React.FC<ImageCardProps> = ({ image, description, onClick }) => {
  return (
    <div>
      <img src={image} alt={description} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
