import css from  'components/ImageGallery/ImageGallery.module.css'

const ImageGallery =({children})=>{
 return (
    <ul className={css.listGallery}>{children}</ul>
  )
}
export default ImageGallery ;
