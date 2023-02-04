import axios from "axios";


const instanse =axios.create({           // це той самий axios тільки налаштований  , налаштування можуть бути дуже рівні 
baseURL:"https://pixabay.com/api/"     // наш адрес 
})

export const getAxios =async(search ,page)=>{
  const{data}= await instanse.get(`/?q=${search}&key=31958740-fc1ca03b202680423fa77b228&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
  return data
  }



