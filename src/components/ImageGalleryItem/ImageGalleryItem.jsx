import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSS from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    selectedImage: null,
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  onHandleKeyDown = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { items } = this.props;
    const { selectedImage } = this.state;

    const cards = items.map(({ id, webformatURL, tags, largeImageURL }) => {
      return (
        <li key={id} className={CSS.galleryItem}>
          <img
            className={CSS.image}
            src={webformatURL}
            alt={tags}
            onClick={() => this.handleImageClick({ largeImageURL, tags })}
          />
        </li>
      );
    });

    return (
      <>
        {cards}
        {selectedImage && (
          <Modal
            onClose={this.onHandleKeyDown}
            image={selectedImage.largeImageURL}
            tags={selectedImage.tags}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
