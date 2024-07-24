import React from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        {title}
        {isOpen ? <span>-</span> : <span>+</span>}
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

AccordionItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AccordionItem;
