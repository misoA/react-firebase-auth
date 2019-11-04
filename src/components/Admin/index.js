import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "components/Firebase";
import { withAuthorization } from "components/Session";
import * as ROLES from "constants/roles";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      // Obj to List
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>관리자 페이지</h1>

        {loading && <div>Loading ... </div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>
            <font color="red">{user.role}</font>
          </strong>
        </span>
        <br />
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <br />
        <span>
          <strong>User Name:</strong> {user.username}
        </span>
        <br />
        <span>
          <strong>Phone Number:</strong> {user.phone}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && authUser.role === ROLES.ADMIN;

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
