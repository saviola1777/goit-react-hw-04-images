import React from "react"
// import css from 'components/App.module.css'
// import axios from "axios"

import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import { getAxios } from 'components/Api/GalleryApi'
import Loader from 'components/Loader/Loader'
class App extends React.Component {
  state = {
    items: [],                         //зберігаємо дані з аякс запиту , картинки опис тощо
    loading: false,                  //cтворюємо для того що коли йде запит ми могли показати спінер чи повідомлення що запит іде
    error: null,                       //обєкт для повідомлення якщо є якась помилка 
    search: '',                        //записуємо дані з мого інпута з поля в якому ми шукаємо фотографію тощо
    page: 1,                          //пля пагінації при отправці сторінка має бути першою
    showModal: false,                 //для нашої модалки щоб її не було видно при натискані на шось ставала тру і зявлялася 
    largeImg: null,                   //будемо передавати Big picture
    totalPages: 1,
    perPage: 12,
  }

  componentDidUpdate(prevProps, prevState) {               //попередні пропси   попередній стейт
    const { search, page } = this.state                         // доступ до стейта  
    if (prevState.search !== search || prevState.page !== page) {   //якшо попередня строка пошуку не дорівнює  теперішній prevState.search -тобто тещо ми вписали попередній раз не таке саме що 
      this.fetchPosts()                                       //що вписали зараз і так само номер page , то тоді ми визиваємо this.fetchPosts()
    }
  }                                                       //this.fetchPosts() -це функція яка відповідає за повернення запиту і відловлювання помилок 

  async fetchPosts() {
    try {
      this.setState({ loading: true })
      const { search, page ,perPage  } = this.state;
      const {hits,totalHits} = await getAxios(search, page ,perPage )

      this.getTotalPages(totalHits);

      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    }
    catch (error) {
      this.setState({ error: error.message })
    }
    finally {
      this.setState({ loading: false })
    }
  }

  getTotalPages(totalHits) {
    const { perPage } = this.state;
    let pages = Math.floor(totalHits / 12);
    pages = totalHits % perPage ? pages + 1 : pages;
    console.log(pages);
    this.setState({ totalPages: pages });
  }

  searchImage = ({ search }) => {                          //метод куди ми буде передавати search те що ми впишемо в інпут 
    this.setState({ search, page: 1, items: [] })      //оскільки ми передаємо це як проп присабміті то записуємо те що ми пишемо в інпуті 
  }                                             // при сабміті оскільки ми будеио знов шось шукати і захочемо отримати нові картинки page:1 ,items:[] очистить масив з картинками

  loadMore = () => {                                          //prevState--завжди коли треба попереднє значення
    this.setState(prevState => ({ page: prevState.page + 1 }))  //при натискані на кнопку loadmore в стейт буде плюсувати +1 да page і рендирити наступні картинки (пагінація) 
  }

  showImage = ({ largeImageURL, tags }) => {       //тут ми будемо забирати велику картинку і опис коли в методі this.setState то зажди стрілочна функція ()=>
    this.setState({
      largeImg: {                //в наш largeImg ми запишемо два забрані значення велику картинку largeImageURL, і опис tags,
        largeImageURL,
        tags,
      },
      showModal: true,                   //цей метод ми передамо як пропс передали в наш список з картинками і коли ми натиснемо на якусь карьтнку спраццює howModal:true і відкриє модадку
    })
  }

  closeModal = () => {                                         //метод за допомогою якого ми будемо закривати модалку
    this.setState({ showModal: false, largeImg: null, })      //закриває модалку і очишає мій обєкт з великою картинкою  largeImg:null,
  }

  render() {
    const { items, loading, error, showModal, largeImg ,page , totalPages } = this.state;
    const { searchImage, loadMore, showImage, closeModal } = this;
    console.log(this.state)
  
    return (
      <>
        <Searchbar onSubmit={searchImage} />
        <ImageGallery><ImageGalleryItem items={items} showImage={showImage} /></ImageGallery>

        {loading && <Loader />}
        {error && <p>Something go wrong</p>}
        {Boolean(items.length) && <Button onClick={loadMore} page={page} totalPages={totalPages} />}
        {showModal && <Modal largeImg={largeImg} close={closeModal} />}

      </>
    )
  }
}
export default App




// componentDidUpdate(prevProps ,prevState){  //попередні пропси   попередній стейт
//   const{search ,page}=this.state
// if(prevState.search!==search ||prevState.page!==page){   //якшо попередня строка пошуку не дорівнює  теперішній prevState.search --те що ми записали в попередній раз (search)те що записали зараз
//   this.setState({loading: true})
// //  axios.get(`https://pixabay.com/api/?q=${search}&key=31958740-fc1ca03b202680423fa77b228&image_type=photo&orientation=horizontal&per_page=12`)
//  searchImage(search ,page)
//  .then(data=>this.setState(({items})=> ({items:[...items, ...data.hits]})))
//  .catch(error=>this.setState({error:error.message}))
//  .finally(()=>this.setState({loading: false}))
//  console.log()
// } }