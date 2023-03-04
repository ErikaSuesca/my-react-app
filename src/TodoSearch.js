import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue }){
    
    const onSearchValueChange = (event) => { //Cada vez que hagamos un cambio llama la función para actualizarla
        console.log(event.target.value);
        setSearchValue(event.target.value); // Actualiza el valor 
    };

    return (
        <input 
        className='TodoSearch' 
        placeholder='Busca aquí' 
        value={searchValue} // El valor debe ser igual al estado
        onChange={onSearchValueChange} 
        />
    );
};

export { TodoSearch } 