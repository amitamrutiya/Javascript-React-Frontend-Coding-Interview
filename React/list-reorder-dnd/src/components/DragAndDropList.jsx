import React, { useState } from 'react';
import './DragAndDropList.css';

const DragAndDropList = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (index) => {
    const draggedOverItem = items[index];
    if (draggedOverItem === items[draggedItemIndex]) {
      return;
    }

    const itemsCopy = [...items];
    const draggedItem = itemsCopy[draggedItemIndex];
    itemsCopy.splice(draggedItemIndex, 1);
    itemsCopy.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setItems(itemsCopy);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div className="drag-and-drop-list">
        <h1>Drag and Drop List</h1>
        <form className='form' onSubmit={(e)=>{
                e.preventDefault();
                if (text.trim() !== '') {
                setItems([...items, text]);
                setText('');
                }
            }}>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Task Name'  />
            <button type='submit'>Add Task</button>
        </form>
      {items.map((item, index) => (
        <div
          key={index}
          className="list-item"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DragAndDropList;
