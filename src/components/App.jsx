

import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import { getAxios } from 'components/Api/GalleryApi'
import Loader from 'components/Loader/Loader'

import {useState ,useEffect ,useCallback } from 'react'

const App =()=>{
const[items ,itemsState]=useState ([]) ;
const[loading, loadingState]=useState (false) ;
const[error, errorState]=useState (null) ;
const[search, searchrState]=useState ('') ;
const[page, pageState]=useState (1) ;
const[showModal, showModalState]=useState (false) ;
const[largeImg, largeImgState]=useState (null) ;
const[totalPages, totalPagesState]=useState (1) ;
// console.log(totalPages)

useEffect(()=>{
  if(!search) return                               // створюємо умову якшо search буде   то ми створемо функцію і викликаємо її якщо буде пусте поле пошуку нема сенсу її створювати
    const fetchPosts= async ()=> {                 // створюємл асинхрону функцію для запиту 
      try {
        loadingState(true)
        const {hits,totalHits} = await getAxios(search, page)
        totalPagesState(Math.round(totalHits/12));
        itemsState(prevState=>([...prevState , ...hits]))
      }
      catch (error) {
        errorState(error.message)
      }
      finally {
        loadingState(false)
      }
    }
    fetchPosts() ;
 
},[search ,page , loadingState , totalPagesState , errorState ]) 


const searchImage =useCallback( ({ search }) => {                          //метод куди ми буде передавати search те що ми впишемо в інпут  
  searchrState(search) ;                                       //передає в наш search тещо ми пишем в інпут
  itemsState([]) ;                                            //робить масив пустим тобто видаляє всі капопередні картинки
  pageState(1) ;                                              //рбить першою сторінкою 
},[])

  // const showImage = ({ largeImageURL, tags }) => {       //тут ми будемо забирати велику картинку і опис коли в методі this.setState то зажди стрілочна функція ()=>
  //   largeImgState({largeImageURL, tags})
  //   showModalState(true)
  // }

  const showImage = useCallback(({ largeImageURL, tags }) => {       //тут ми будемо забирати велику картинку і опис коли в методі this.setState то зажди стрілочна функція ()=>
    largeImgState({largeImageURL, tags})
    showModalState(true)
  },[])
  
  const loadMore =useCallback( () => {                                          //prevState--завжди коли треба попереднє значення
    pageState(prevPage => prevPage + 1)  //при натискані на кнопку loadmore в стейт буде плюсувати +1 да page і рендирити наступні картинки (пагінація) 
  },[])
  
  const closeModal =useCallback( () => {                                         //метод за допомогою якого ми будемо закривати модалку
    showModalState(false)                                            //закриває модалку 
    largeImgState(null)                                              //і очишає мій обєкт з великою картинкою  largeImg:null,
  },[])

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


export default App