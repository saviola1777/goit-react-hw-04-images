
import css from 'components/Searchbar/Searchbar.module.css'
// import React from "react"
import PropTypes from 'prop-types';
import {useState } from 'react';
import initialState from 'components/Searchbar/Searchbar'
// import useSearchbar from 'components/shared/useSearchbar'

const Searchbar =({onSubmit})=>{
  // const{state , onHendleChange,onHendleSubmit}= useSearchbar ({initialState , onSubmit})

 const[state, setState]= useState({...initialState})
  const onHendleChange = ({target})=>{                          //функція при зміні нашого інпуті тобто  те що ми записуємо ({target}) це те саме що e.target обєкт на якому від подія
    const{name ,value}=target ;                                  //деструктуризація 
    setState(prevState=>{                                        //зміна нашого стейту де [name] - це назва нашого name в інпуті два інпута з назвою name і number 
      return {...prevState ,[name]:value}                        //name: значення що ми впишемо в інпут з назвою нейм number:все що впишемо в інпут з назвою намбер
    })
   }

   const onHendleSubmit = (e) => {                 
    e.preventDefault();                          
    onSubmit({...state})                               //в наш проп передали дані зі стейту тут можна було писати state.search но  нижче провів деструктуризацію
    setState({...initialState})
   }

 const{search} = state
 return(
  <header className={css.searchbar}>
    <form className={css.form} onSubmit={onHendleSubmit}>  
      <input
        onChange={onHendleChange}
        name="search"
        value={search}
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder="Search images and photos"
      />
         <button type="submit" className={css.button}>
        <span className={css.span}>Search</span>
      </button>
    </form>
  </header>
      )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar