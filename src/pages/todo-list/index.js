import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [domLoaded, setDomLoaded] = useState(false);

  var loadedTodos = [];
  const [item, setItem] = useState("");
  if (typeof window !== "undefined") {
    loadedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
  }
  const [todo, setTodo] = useState(loadedTodos);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (todo.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo]);

  // adding item to todo list
  const handleAdd = (e) => {
    e.preventDefault();
    if (!item) {
      alert("please enter a todo");
      return false;
    }
    setTodo((currentItems) => {
      return [
        ...currentItems,
        { id: Math.floor(Math.random() * 1000), title: item, status: false },
      ];
    });
    setItem("");
  };

  // deleting item from todo list
  const deleteItem = (i) => {
    setTodo((currentItems) => {
      return currentItems.filter((item) => item.id != i);
    });
  };

  // toggling status on todo item
  const toggle = (id) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };
  //rendering the components only when the dom is loaded
  return (
    <>
      {domLoaded && (
        <div className="h screen flex justify-center items-center pt-5 mt-5">
          <div>
            <h2 className="text-5xl py-5 text-center font-bold">To do list</h2>
            <div>
              <form className="flex justify-center mt-5">
                <input
                  value={item}
                  type="text"
                  id="item"
                  placeholder="add item..."
                  onChange={(e) => setItem(e.target.value)}
                  className="text-xl bg-slate-200 placeholder-slate-600 py-2 px-5 outline-slate-500"
                />
                <button
                  className="text-xl text-slate-600  py-2 pr-5 pl-4 rounded-r-full outline outline-1 outline-slate-300"
                  onClick={(e) => handleAdd(e)}
                >
                  Add
                </button>
              </form>
            </div>
            {todo.length > 0 && (
              <div className="p-5">
                <ul>
                  {todo.map((i) => {
                    return (
                      <li className="p-1 flex justify-between" key={i.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={i.status}
                            onChange={(e) => toggle(i.id)}
                            className="p-3"
                          />
                          {" " + i.title}
                        </label>
                        {i.status && (
                          <button onClick={() => deleteItem(i.id)}>
                            <MdDelete />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {todo.length === 0 && (
              <div className="p-5">
                {" "}
                <p className="pl-5">
                  There is nothing in the list. Add something to continue...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Todo;
