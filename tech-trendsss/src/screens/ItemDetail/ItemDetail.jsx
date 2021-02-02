import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class ItemsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="Itemspage">
        {item === undefined ? <h2>Loading . . .</h2> : (
          <div>
            <img alt={item.name} src={item.photo} />
            {this.state.isEdit ?
              <Route path={'/items/:id/edit'} render={() => (
                <itemDetail
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editItem();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/items/${this.props.itemForm.id}`)
                  }}
                  itemForm={this.props.itemForm} />
              )} />
              :
              <>
                <h1>{item.name}</h1>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/items/${item.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteItem(item.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(ItemsView);