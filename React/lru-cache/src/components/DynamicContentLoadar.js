import { useState } from "react";
import useLRUCache from "../hooks/use-lru-cache";

const DynamicContentLoader = () => {
  const [content, setContent] = useState([]);
  const { get, put } = useLRUCache(3);

  const loadContent = async (tab) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedContent = {
      tab,
      text: `Content for tab ${tab}`,
    };
    put(tab, loadedContent);

    setContent((prev) => [...prev, loadedContent]);
  };

  const handlButtonClick = (tab) => {
    const cachedContent = get(tab);

    if (cachedContent) {
      console.log(`Content for tab ${tab} is already cached`);
      setContent((prev) => [...prev, cachedContent]);
      return;
    }
    console.log(`Loading content for ${tab} that is not cached`);

    loadContent(tab);
  };

  return (
    <div>
      <h2>Dynamic Content Loader with LRU Cache</h2>
      <button onClick={() => handlButtonClick(1)}>Tab 1</button>
      <button onClick={() => handlButtonClick(2)}>Tab 2</button>
      <button onClick={() => handlButtonClick(3)}>Tab 3</button>
      <button onClick={() => handlButtonClick(4)}>Tab 4</button>
      <button onClick={() => handlButtonClick(5)}>Tab 5</button>
      <button onClick={() => handlButtonClick(6)}>Tab 6</button>

      <div>
        <h3>Loaded Content</h3>
        <ul>
          {content.map((item, index) => {
            return <li key={index}>{item.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DynamicContentLoader;
