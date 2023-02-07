

  import Searchbar from 'components/Searchbar/Searchbar'
  import ImageGallery from 'components/ImageGallery/ImageGallery'
  import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
  import Button from 'components/Button/Button'
  import Modal from 'components/Modal/Modal'
  import { getAxios } from 'components/Api/GalleryApi'
  import Loader from 'components/Loader/Loader'

  import { useState, useEffect, useCallback } from 'react'

  const App = () => {
    const [items, itemsState] = useState([]);
    const [loading, loadingState] = useState(false);
    const [error, errorState] = useState(null);
    const [search, searchrState] = useState('');
    const [page, pageState] = useState(1);
    const [showModal, showModalState] = useState(false);
    const [largeImg, largeImgState] = useState(null);
    const [totalPages, totalPagesState] = useState(1);
    console.log(totalPages, page)

    useEffect(() => {                                    //useEffect це хук для використання методів життєвого циклу 1 аргумент функція логіка другим аргументом це залежність події
      if (!search) return                               // створюємо умову якшо search буде   то ми створемо функцію і викликаємо її якщо буде пусте поле пошуку нема сенсу її створювати
      const fetchPosts = async () => {                 // створюємл асинхрону функцію для запиту async ()=> ачинхрона функція 
        try {                                        // якщо запит виконався успішно
          loadingState(true)                                     //змінує стейт на тру
          const { hits, totalHits } = await getAxios(search, page) // імпортуємо і визмваємо функцію getAxios яка нпм буде повертати катинки з  запиту на api  
          totalPagesState(Math.ceil(totalHits / 12));            //змінюємо стан загальну кількість всіх картинок які прийшли /12 І ОТРИМУЄМО КІЛЬКІСТЬ СТОРІНОК
          itemsState(prevState => ([...prevState, ...hits]))    //змінюємо стін itema берем попередній стан тезо було розмилюємо і розпилюємо туда те що прийшло ...hits
        }
        catch (error) {                                        //відловлює помилку
          errorState(error.message)
        }
        finally {                                 // чи був запит успішний чи була помилка finally  завжди виконається
          loadingState(false)
        }
      }
      fetchPosts();                               //  визиваємо нашу функцію

    }, [search, page]) // Другий аргумент призміні цих станів буде визиватися перший аргумент тобто виконання функції 


    const searchImage = useCallback(({ search }) => {                          //метод куди ми буде передавати search те що ми впишемо в інпут  
      searchrState(search);                                       //передає в наш search тещо ми пишем в інпут
      itemsState([]);                                            //робить масив пустим тобто видаляє всі капопередні картинки
      pageState(1);                                              //рбить першою сторінкою 
    }, [])

    const showImage = ({ largeImageURL, tags }) => {       //тут ми будемо забирати велику картинку і опис коли в методі this.setState то зажди стрілочна функція ()=>
      largeImgState({ largeImageURL, tags })                            // заберемо велику картинку і опис і запишемо в стейт
      showModalState(true)
    }

    const loadMore = () => {                                          //prevState--завжди коли треба попереднє значення
      pageState(prevPage => prevPage + 1)  //при натискані на кнопку loadmore в стейт буде плюсувати +1 да page і рендирити наступні картинки (пагінація) 
    }

    const closeModal = () => {                                         //метод за допомогою якого ми будемо закривати модалку
      showModalState(false)                                            //закриває модалку 
      largeImgState(null)                                              //і очишає мій обєкт з великою картинкою  largeImg:null,
    }

    return (
      <>
        <Searchbar onSubmit={searchImage} />
        <ImageGallery><ImageGalleryItem items={items} showImage={showImage} /></ImageGallery>

        {loading && <Loader />}
        {error && <p>Something go wrong</p>}
        {Boolean((page !== totalPages)) && <Button onClick={loadMore} page={page} totalPages={totalPages} />}
        {showModal && <Modal largeImg={largeImg} close={closeModal} />}

      </>
    )
  }


  export default App