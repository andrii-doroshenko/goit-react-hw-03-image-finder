import { Component } from 'react';
import CSS from './ImageGallery.module.css';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getPixabayQuery } from '../../services/getPixabay';
import { ErrorMessage } from '../ErrorCard/ErrorCard';

class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryValue !== this.props.queryValue) {
      this.setState({ status: 'pending' });

      const resp = await getPixabayQuery(this.props.queryValue);

      if (!resp.ok) {
        this.setState({ status: 'rejected' });
      } else {
        const respJson = await resp.json();
        if (respJson.hits.length === 0) {
          this.setState({ status: 'rejected' });
        } else {
          const cards = respJson.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id: id,
              webformatURL: webformatURL,
              largeImageURL: largeImageURL,
              tags: tags,
            })
          );

          this.setState({ images: cards, status: 'resolved' });
        }
      }
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'pending') {
      return <ColorRing wrapperClass={CSS.blocksWrapper} />;
    }

    if (status === 'resolved') {
      return (
        <ul className={CSS.gallery}>
          {images && <ImageGalleryItem props={images} />}
        </ul>
      );
    }

    if (status === 'rejected') {
      return <ErrorMessage />;
    }

    return null;
  }
}

export default ImageGallery;
