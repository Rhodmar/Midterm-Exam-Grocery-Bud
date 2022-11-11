import React, { useState } from "react";
import "./App.css";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      item: item,
      complete: false,
    };
    e.preventDefault();
    if (item && !edit) {
      setList([...list, newItem]);
      setItem("");
      setError("");
    } else if (item && edit && editId) {
      setList(
        list.map((el) => {
          if (el.id === editId) {
            return { ...el, item: item };
          }
          return el;
        })
      );
      setItem("");
      setEditId(null);
      setEdit(false);
      setError("");
    } else if (!item) setError("Item cannot be blank.");
  };

  const clearList = () => {

    setError("")
    setList([]);
  
};

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };
  

  return (
    <div className="Background">
    <div className="App">
      <h1>Grocery List</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Enter the items"
          onChange={handleChange}
        />
        {edit ? (
          <button className="btn" type="submit">
            Edit
          </button>
        ) : (
          <button className="btn" type="submit">
            Add
          </button>
        )}
        
        
      </form>
      
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            complete={c.complete}
            setItem={setItem}
            setEdit={setEdit}
            setEditId={setEditId}
          />
          
        ))
        }

              
      </div>
      
    </div>
    <button className='clear-btn' onClick={() =>{
                    if(list.length == 0){
                      setError("List is empty.");
                    }
                    else{
                const confirmBox = window.confirm("Do you want to clear your grocery list?");
                if (confirmBox === true){
                  clearList();
                }
              }
              }}>
                Clear Items</button>
    </div>
  );
}

export default App;
