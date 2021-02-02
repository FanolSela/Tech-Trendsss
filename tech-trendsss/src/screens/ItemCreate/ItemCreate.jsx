import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateItem(props) {
  return (
    <div className="create-form" >
      <h2>Create your Tech</h2>
      <form onSubmit={props.newItem}>
        <input
          type="text"
          name="photo"
          value={props.itemForm.photo}
          onChange={props.handleFormChange} />
          <p>Tech's name:</p>
        <input
          type="text"
          name="name"
          value={props.itemForm.name}
          onChange={props.handleFormChange} />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(CreateItem);