import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    queryValue: '',
  };

  handleSearch = valueSearch => {
    this.setState({ queryValue: valueSearch });
  };

  render() {
    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery queryValue={this.state.queryValue} />
      </>
    );
  }
}

export default App;
