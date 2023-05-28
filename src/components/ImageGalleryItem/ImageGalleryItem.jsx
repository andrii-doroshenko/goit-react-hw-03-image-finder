import CSS from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ props }) => {
  return props.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li key={id} className={CSS.galleryItem}>
        <img className={CSS.image} src={webformatURL} alt={tags} />
      </li>
    );
  });
};
