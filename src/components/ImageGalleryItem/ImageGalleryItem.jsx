import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

const ImageGalleryItem =({items ,showImage})=>{
 return (
 
    items.map(({id , webformatURL,largeImageURL,tags})=>
    <li key={id} onClick={()=>showImage({largeImageURL , tags})} className={css.itemImage}>
    <img src={webformatURL} alt={tags} className={css.img}/>
  </li>
        )
  )
}
export default ImageGalleryItem ;

ImageGalleryItem.defaultPrors={
  items:[]
}
ImageGalleryItem.prototype={
  showImage:PropTypes.func.isRequired,
	items:PropTypes.arrayOf(PropTypes.shape({
		id:PropTypes.string.isRequired ,
		webformatURL:PropTypes.string.isRequired,
		largeImageURL:PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired ,
	})),
 }
 