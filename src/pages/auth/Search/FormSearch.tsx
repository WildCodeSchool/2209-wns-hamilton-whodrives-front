import React from 'react'
import { useEffect, useState } from 'react';




const MyComponent: React.FC = () => {
    const today = new Date().toLocaleDateString('en-us', {  year:"numeric", month:"2-digit", day:"2-digit"}) 
    console.log(today);
    
    const [form, setForm] = useState({
        départ:"départ",
        déstination:"destination",
        date:today,
        personnes:"",
    })

    const [word, setWord] = useState([])
    const [data,setData] =useState([])
    const getcity = async () => {
        try {
          const response = await fetch( `https://geo.api.gouv.fr/communes?nom=${word}&fields=population&limit=5`);
          const json = await response.json();
          setData(json.map((e:any)=>e.nom));
        } catch (error) {
          console.error(error);
        } 
      };
useEffect(()=>{
    if(word.length === 0){
        setData([])
        getcity()
    }else{

        getcity()
    }
},[word])
const handleChange =(e:any)=>{
    setWord(e.target.value)
}
console.log(data,"kebab data");
console.log(word,"sauce blanche word");
const options ={data}
 return(
    <>
 

 <input type="text" value={form.départ} />
<input type="text" value={form.déstination} />
<input type="date" value={form.date} />
<select name='1' placeholder='personne'>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
</select>
<button>rechercher</button>
    </>
 )
}

export default MyComponent
