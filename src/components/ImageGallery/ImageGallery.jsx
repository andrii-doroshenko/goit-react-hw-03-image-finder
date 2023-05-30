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
  };

  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.queryValue !== nextProps.queryValue) {
      return { page: 1, queryValue: nextProps.queryValue };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const shouldComponentReset = prevProps.queryValue !== this.props.queryValue;
    const shouldComponentAddNextPage = prevState.page !== this.state.page;

    if (shouldComponentReset || shouldComponentAddNextPage) {
      this.setState({ isLoading: true, error: false });

      getPixabayQuery(this.props.queryValue, this.state.page)
        .then(resp => {
          if (!resp.ok) {
            throw new Error();
          }
          return resp.json();
        })
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({ error: true });
          }

          this.setState(prevState => ({
            images:
              prevState.page === 1
                ? images.hits
                : [...prevState.images, ...images.hits],
            isLoading: false,
          }));
        })
        .catch(error => this.setState({ error: true }));
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        {error && <ErrorMessage />}

        <ul className={CSS.gallery}>
          {images && <ImageGalleryItem items={images} />}
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
