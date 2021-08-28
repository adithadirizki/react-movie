import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/usersAction";
import store from "../store";

// console.log(store.getState())

class Users extends Component {
  componentDidMount() {
   //  this.props.getUsers();
  }
  render() {
   //  const { users } = this.props.users;

    return (
      <div>
        {/* {users.map((u) => (
          <React.Fragment key={u.id}>
            <h6>{u.name}</h6>
          </React.Fragment>
        ))} */}
      </div>
    );
  }
}

store.dispatch(getUsers());
console.log(store.getState().users);
const mapStateToProps = (state) => {
  console.log(state.users);
  return { users: store.getState().users };
};
// console.log(mapStateToProps(store.getState()));
// console.log(store.getState());

export default Users;
