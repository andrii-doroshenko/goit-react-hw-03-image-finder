import { Component } from 'react';
import PropTypes from 'prop-types';
import CSS from './ImageGallery.module.css';
import { ColorRing } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { getPixabayQuery } from '../../services/getPixabay';
import { ErrorMessage } from '../ErrorCard/ErrorCard';
import { Button } from 'components/Button/Button';

class ImageGallery extends Component {
  static propTypes = {
    queryValue: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  };

  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryValue !== this.props.queryValue) {
      await this.setState({ isLoading: true, page: 1 });

      const resp = await getPixabayQuery(
        this.props.queryValue,
        this.state.page
      );

      if (!resp.ok) {
        this.setState({ error: true, images: [] });
      } else {
        const respJson = await resp.json();
        if (respJson.hits.length === 0) {
          this.setState({ error: true, isLoading: false, images: [] });
        } else {
          const cards = respJson.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id: id,
              webformatURL: webformatURL,
              largeImageURL: largeImageURL,
              tags: tags,
            })
          );
          this.setState({ images: cards, isLoading: false, error: false });
        }
      }
    }
  }

  loadMoreImages = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({ isLoading: true });

    try {
      const resp = await getPixabayQuery(this.props.queryValue, nextPage);
      const respJson = await resp.json();

      if (!resp.ok || respJson.hits.length === 0) {
        this.setState({ error: true, isLoading: false, images: [] });
      } else {
        const newCards = respJson.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...newCards],
          page: nextPage,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ error: true, isLoading: false });
    }
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        {error && <ErrorMessage />}

        <ul className={CSS.gallery}>
          {images && <ImageGalleryItem props={images} />}
        </ul>
        {isLoading && <ColorRing wrapperClass={CSS.blocksWrapper} />}
        {images.length > 0 && (
          <Button className={CSS.loadMore} onClick={this.loadMoreImages}>
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default ImageGallery;
