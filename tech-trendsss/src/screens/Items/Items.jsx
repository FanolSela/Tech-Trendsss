import React from 'react';
import { withRouter } from 'react-router';

function itemsDisplay(props) {
  return (
    <div className="item-container">
      {props.items.map(item => (
        <div
          key={item.id}
          className="item-card"
          onClick={() => {
            props.history.push(`/items/${item.id}`);
            window.scrollTo(0, 0);
          }}>
          <img alt={item.name} src={item.photo} />
          <h3>
            <p>{item.name}</p>
          </h3>
        </div>
      ))}
      <div
        className="item-card"
        onClick={() => {
          props.history.push('/new/item');
          window.scrollTo(0, 0);
        }}>
        <img
          alt="Create a new item"
          src="https://image.flaticon.com/icons/png/512/14/14980.png"
          className="plus-sign" />
        <h3>Create a new item</h3>
      </div>
    </div>
  )
}

export default withRouter(itemsDisplay)