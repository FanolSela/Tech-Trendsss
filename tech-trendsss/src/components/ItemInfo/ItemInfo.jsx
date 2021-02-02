import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function ItemInfo(props) {
  const { item, deleteItem, currentUser } = props;
  const history = useHistory();

  return (
    <>
      <h1>{item.name}</h1>
      {currentUser && (
        <>
          <Link to={`/${item.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => {
            deleteItem(item.id);
            history.push('/')
          }}>Delete</button>
        </>
      )}
    </>
  )
}