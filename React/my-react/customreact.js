let hookIndex = 0;
let hooks = [];
let currentComponent = null;

// Custom useState hook implementation
function useState(initialValue) {
  const currentIndex = hookIndex;
  hookIndex++;

  // Initialize hook if it doesn't exist
  if (hooks[currentIndex] === undefined) {
    hooks[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    // Update the state
    hooks[currentIndex] =
      typeof newValue === "function" ? newValue(hooks[currentIndex]) : newValue;

    // Re-render the current component
    if (currentComponent) {
      renderComponent();
    }
  };

  return [hooks[currentIndex], setState];
}

// Enhanced render function for React elements
function customRender(reactElement, container) {
  // Clear container
  container.innerHTML = "";

  const domElement = document.createElement(reactElement.type);

  // Handle props
  if (reactElement.props) {
    for (const prop in reactElement.props) {
      if (
        prop.startsWith("on") &&
        typeof reactElement.props[prop] === "function"
      ) {
        // Handle event listeners
        const eventName = prop.toLowerCase().substring(2);
        domElement.addEventListener(eventName, reactElement.props[prop]);
      } else {
        domElement.setAttribute(prop, reactElement.props[prop]);
      }
    }
  }

  // Handle children
  if (reactElement.children) {
    if (typeof reactElement.children === "string") {
      domElement.textContent = reactElement.children;
    } else if (Array.isArray(reactElement.children)) {
      reactElement.children.forEach((child) => {
        if (typeof child === "string") {
          domElement.appendChild(document.createTextNode(child));
        } else {
          const childWrapper = document.createElement("div");
          customRender(child, childWrapper);
          domElement.appendChild(childWrapper.firstChild);
        }
      });
    }
  }

  container.appendChild(domElement);
}

// Component system
function createComponent(componentFunction) {
  return function () {
    hookIndex = 0; // Reset hook index for each render
    currentComponent = { fn: componentFunction };
    return componentFunction();
  };
}

// Render component function
function renderComponent() {
  if (!currentComponent) return;

  hookIndex = 0; // Reset hook index
  const element = currentComponent.fn();
  console.log("Element to render:", element);
  const container = document.querySelector("#root");
  customRender(element, container);
}

// Counter component example using custom useState
const Counter = createComponent(() => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Click the buttons!");

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setMessage(`Count increased to ${count + 1}!`);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setMessage(`Count decreased to ${count - 1}!`);
  };

  const reset = () => {
    setCount(0);
    setMessage("Counter reset!");
  };

  return {
    type: "div",
    props: {
      style:
        "padding: 20px; font-family: Arial, sans-serif; text-align: center;",
    },
    children: [
      {
        type: "h1",
        props: {},
        children: "Custom React useState Hook Demo",
      },
      {
        type: "div",
        props: {
          style: "margin: 20px 0; font-size: 24px; font-weight: bold;",
        },
        children: `Count: ${count}`,
      },
      {
        type: "div",
        props: {
          style: "margin: 10px 0; color: #666;",
        },
        children: message,
      },
      {
        type: "div",
        props: {
          style: "margin: 20px 0;",
        },
        children: [
          {
            type: "button",
            props: {
              onclick: increment,
              style:
                "margin: 0 10px; padding: 10px 20px; font-size: 16px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;",
            },
            children: "Increment",
          },
          {
            type: "button",
            props: {
              onclick: decrement,
              style:
                "margin: 0 10px; padding: 10px 20px; font-size: 16px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;",
            },
            children: "Decrement",
          },
          {
            type: "button",
            props: {
              onclick: reset,
              style:
                "margin: 0 10px; padding: 10px 20px; font-size: 16px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;",
            },
            children: "Reset",
          },
        ],
      },
    ],
  };
});

// Initialize the app
const mainContainer = document.querySelector("#root");
const counterComponent = Counter();
customRender(counterComponent, mainContainer);
