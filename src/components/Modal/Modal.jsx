import css from 'components/Modal/Modal.module.css'
import React from 'react'
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom'  // Імпорт з реакт дому для встановлення модалки поверх всіх елементів

const modalRoot = document.querySelector('#modal-root')    //доступ до нашого діва в якому буде модалка який знаходиться по верх всіх елементів
class Modal extends React.Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }
  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      this.props.close()
    }
  }
  render() {
    const { closeModal } = this
    const { largeImg, close } = this.props
    return (

      createPortal(                // createPortal ---мнтод де першим аргументом ми кажем що відмалювати , а другий доступ до діва куда саме ми одмалюємо модалку

        <div className={css.overlay} onClick={closeModal}>
          <div className={css.modal}>
            <span className={css.span} onClick={close}>X</span>
            <img className={css.img} src={largeImg.largeImageURL} alt={largeImg.tags} />
          </div>
        </div>,
        modalRoot    // другий елемент це доступ до нашого діва який знаходиться по верх всіх елементів
      )
    )
  }
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  largeImg: PropTypes.object.isRequired,
};
export default Modal



