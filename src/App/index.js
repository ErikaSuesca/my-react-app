import React from 'react';
import { AppUI } from './AppUI';

function useLocalStorage(itemName, initialValue) {
  const localStorageTodos = localStorage.getItem(itemName); // Traemos nuestros TODOs almacenados
  let parsedItem;

  if (!localStorageTodos) {
    // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    // Si existen TODOs en el localStorage los regresamos como nuestros todos
    parsedItem = JSON.parse(localStorageTodos);
  }

  const [item, setItem] = React.useState(parsedItem); // Guardamos nuestros TODOs del localStorage en nuestro estado
  // Creamos la función en la que actualizaremos nuestro localStorage
  const saveItem = (newTodos) => {
    // Convertimos a string nuestros TODOs
    const stringifiedTodos = JSON.stringify(newTodos);
    // Los guardamos en el localStorage
    localStorage.setItem(itemName, stringifiedTodos);
    // Actualizamos nuestro estado
    setItem(newTodos);
  };

  return [
    item,
    saveItem,
  ];
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState(''); // Se crea el estado que se guarda en searchValue

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText); // Este es el criterio con el que determina que TODOs muestra en nuestra lista
      // Por cada uno de los TODOs estamos filtrando cuales de los todos los TODOs incluye en alguna parte el texto que escribimos en nuestro input de búsqueda
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos]; // Se clonan los TODOs, creando una nueva lista de TODOs
    newTodos[todoIndex].completed = true; // Acá la estamos marcando al TODO que cumple con las condiciones
    saveTodos(newTodos); // Actualizamos el estado para renderizar nuevamente
    // Esta función c/d que reciba un texto va buscar cual de todos los TODOs en nuetra lista cumple con esa condición
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1); // Con este metodo me elimina una parte
    saveTodos(newTodos);
  };

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
