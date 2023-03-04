import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButtom } from "./CreateTodoButtom";
// import './App.css';

const defaultTodos = [
  { text: "Cortar cebolla", completed: true },
  { text: "Tomar el curso de intro a React", completed: false },
  { text: "Llorar con la llorona", completed: true },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState(''); // Se crea el estado que se guarda en searchValue

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1){
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText); // Este es el criterio con el que determina que TODOs muestra en nuestra lista
      // Por cada uno de los TODOs estamos filtrando cuales de los todos los TODOs incluye en alguna parte el texto que escribimos en nuestro input de búsqueda
      // Cuando los usuarios no escriban nada se muestran todos los TODOs
      // Cuando escriban algo solo va mostrar los que cumplan esa condición de búsqueda
    })    
  }

  const completeTodos = (text) =>{
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]; // Se clonan los TODOs, creando una nueva lista de TODOs
    newTodos[todoIndex].completed = true; // Acá la estamos marcando al TODO que cumple con las condiciones
    setTodos(newTodos); // Actualizamos el estado para renderizar nuevamente
    // Esta función c/d que reciba un texto va buscar cual de todos los TODOs en nuetra lista cumple con esa condición
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1); // Con este metodo me elimina una parte
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />

      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue} 
      />

      <TodoList>
        {searchedTodos.map((todo) => ( 
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodos(todo.text)} // Llama la función enviando el texto de ese TODO 
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButtom />
    </React.Fragment>
  );
}

export default App;
