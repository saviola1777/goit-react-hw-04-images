
import css from 'components/Searchbar/Searchbar.module.css'
import React from "react"
import PropTypes from 'prop-types';

class Searchbar extends React.Component {
  state={
    search:''                               // передаємо те що вписали в поле пошуку
  }

  handleChancge=({target})=>{               // звичайний метод для передачі того що ми пишемо в наш стейт в обєкт search
    const{name,value}=target;               // деструктуризація 
    this.setState({[name]:value})            // в наш стейт записуємо  [name]="search" value=те що ми вписуємо в поле пошуку нашого імпута
 }

 handleSubmit=(e)=>{                         //метод отправки форми 
  e.preventDefault();                        // щоб не перезагружало сторінку при отправці форми
 const {onSubmit}=this.props;                // передаємо наш проп searchImage=({search })=>тут при отправці форми this.setState({search , page:1 , items:[] }) 
  onSubmit({...this.state})                  //в мій стейт app розпилить значення search:тобто тещо ми записуємо в інпут 
 this.setState({search:''})                  //після отправки очишає пошук 
 }
  render(){
    const {search}=this.state ;
    const{handleChancge ,handleSubmit}=this
    // console.log(this.state.search)
    return(
<header className={css.searchbar}>
  <form className={css.form} onSubmit={handleSubmit}>  
    <input
      onChange={handleChancge}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar