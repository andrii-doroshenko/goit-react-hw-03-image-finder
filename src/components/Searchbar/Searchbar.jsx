import { Component } from 'react';
import PropTypes from 'prop-types';
import CSS from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
  };

  render() {
    return (
      <header className={CSS.searchbar}>
        <form className={CSS.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={CSS.form_button}>
            <span className={CSS.button_label}>Search</span>
          </button>

          <input
            className={CSS.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
