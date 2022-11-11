import React from "react";
import edit from './Edit.png';
import del from './Delete.png';
const Item = ({
  id,
  item,
  list,
  setEdit,
  setEditId,
  setItem,
  setList,
  complete,
}) => {
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  const handleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };

  const handleItem = (id) => {
    const editItem = list.find((el) => el.id === id);
    setItem(editItem.item);
    setEdit(true);
    setEditId(id);
  };


  return (
    <div className="clearbtn">
    <div className="item">
      <input
        type="text"
        value={item}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "rgb(117, 86, 117)",
          fontSize: "17px",
          padding: "15px",
        }}
        className={complete ? "complete" : ""}
      />
      <img
        
        style={{ 
            cursor:"pointer",
            height:"20px",
            width:"20px"
    }}
        
        onClick={() => {
          const confirmBox = window.confirm("Do you want to edit this item?");
          if (confirmBox === true) {
            handleItem(id);
          }
        }}
        src={edit}
        alt="edit item"
      />

      <img
        style={{ 
            cursor:"pointer",
            height:"20px",
            width:"20px"
    }}
        onClick={() => {
          const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (confirmBox === true) {
            remove(id);
          }
        }}
        src={del}
        alt="delete item"
      />
      
    </div>
    
    </div>
  );
};
export default Item;