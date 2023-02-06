import {useState } from 'react';

const useSearchbar =({initialState , onSubmit})=>{

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
    return{state, setState, onHendleChange , onHendleSubmit }
}
export default useSearchbar 