import React, { Component } from 'react';
import CSS from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayModalClose = e => {
    if (e.target !== e.currentTarget) {
      return;
    } else {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;

    return (
      <div className={CSS.overlay} onClick={this.onOverlayModalClose}>
        <div className={CSS.modal}>
          <img src={image} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
