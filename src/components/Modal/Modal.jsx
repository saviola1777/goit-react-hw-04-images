import css from 'components/Modal/Modal.module.css'
import {useEffect } from 'react'
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom'  // Імпорт з реакт дому для встановлення модалки поверх всіх елементів

const modalRoot = document.querySelector('#modal-root')    //доступ до нашого діва в якому буде модалка який знаходиться по верх всіх елементів

const Modal =({largeImg, close })=>{                          // передаємо пропсами велику картинку і функцію яка закриває модалку міняє на false
 
  const closeModal = ({ target, currentTarget, code }) => {   // деструктупизація на що саме ми клікнули code це назва клавіши
    if (target === currentTarget || code === "Escape") {      //якшо клікнемо поза картинкою або нажмемо на ускейп виклече функцію яка закриває модалку
      close()
    }
  }
  useEffect(()=>{     
 document.addEventListener("keydown", closeModal) ; 
return ()=>document.removeEventListener("keydown", closeModal);
  },[])

return (

    createPortal(                // createPortal ---мнтод де першим аргументом ми кажем що відмалювати , а другий доступ до діва куда саме ми одмалюємо модалку

      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <span className={css.span} onClick={close}>X</span>
          <img className={css.img} src={largeImg.largeImageURL} alt={largeImg.tags} />
        </div>
      </div>,
      modalRoot    // другий елемент це доступ до нашого діва який знаходиться по верх всіх елементів
    ))
}


Modal.propTypes = {
  close: PropTypes.func.isRequired,
  largeImg: PropTypes.object.isRequired,
};
export default Modal



