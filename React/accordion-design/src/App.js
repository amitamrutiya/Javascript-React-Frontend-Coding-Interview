import React from 'react';
import Accordion from './components/Accordion';

const accordionItems = [
  {
    title: 'Section 1',
    content: 'Immediate Joiner - Experienced Front End Developer, creating functional UI with JavaScript, HTML, React, Vue.js, Redux, Tailwind and Bootstrap. Skilled in building scalable SPAs, REST API integration, Agile project delivery and mobile responsiveness.Content for section 1',
  },
  {
    title: 'Section 2',
    content: 'As a UI developer, contributed in a cross functional team including backend, microservices and UX specialists to develop and implement a scalable web architecture for large-scale banking and insurance web application for one of the largest domestic clients in financial domain, using VUE js and Bootstrap, increasing user engagement by 30%..',
  },
  {
    title: 'Section 3',
    content: 'Designed a compelling Full Stack Blog web application utilizing React and styled components. The interface features a modern and polished design, enhancing the overall user experience. Orchestrated the development and implementation of a user-friendly blogging platform, boosting user engagement by 40% through seamless blog interactions, saving and liking features, and effortless content creation. Created a secure user authentication system with Firebase, providing users a dependable platform to manage profiles and safeguard the integrity of their blogging experience',
  },
];

const App = () => {
  return (
    <div>
      <h1>Dynamic Accordion</h1>
      <Accordion items={accordionItems} />
    </div>
  );
};

export default App;
