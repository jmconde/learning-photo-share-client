import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const ADD_FAKE_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      avatar,
      name
    }
  }
`;

const Users = () => <Query query={ROOT_QUERY}>
  {({data, loading, refetch }) => loading ?
    <p>Loading users...</p> :
    <UserList count={data.totalUsers} users={data.allUsers} refetchUsers={refetch} />
  }
</Query>;

const UserList = ({count, users, refetchUsers}) => <div>
  <p>{count} Users</p>
  <button onClick={() => refetchUsers()}>Refetch</button>
  <Mutation mutation={ADD_FAKE_MUTATION} variables={{ count: 1}} refetchQueries={[{query: ROOT_QUERY}]}>
    {addFakeUsers => <button onClick={addFakeUsers}>Add fake user</button>}
  </Mutation>
  <ul>
    {users.map(user => <UserListItem key={user.githubLogin} name={user.name} avatar={user.avatar}></UserListItem>)}
  </ul>
</div>;

const UserListItem = ({name, avatar}) => <li>
  <img src={avatar} width={48} height={48} alt={name} /> {name}
</li>

  export default Users;
