import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Auth from "../authorization/Auth";

class DataSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      users: [],
      experience: [],
      posts: [],
      loading: false,
    };
    this.url = "https://striveschool.herokuapp.com/api/profile/";
    this.urlPost = "https://be-linkedin.herokuapp.com/posts/";
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  };

  fetchData = async () => {
    // this.setState({ loading: true });
    let { query } = this.props;
    console.log("query", query);
    if (!query) {
      this.fetchUser(Auth.user);
      this.fetchPost(query);
      this.fetchUsers();
      this.setState({ loading: false });
    } else {
      if (query === "me") {
        query = Auth.user;
      }

      this.fetchUsers();

      this.fetchUser(query);
      // this.fetchPost();
      this.fetchExperience(query);
      // this.setState({ loading: false });
    }
  };

  fetchExperience = async (query) => {
    let response = await fetch(this.url + query + "/experiences", {
      headers: {
        Authorization: Auth.auth,
      },
    });
    let experience = await response.json();
    this.setState({ experience, isLoading: false });
  };

  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  fetchPost = async () => {
    let response = await fetch(this.urlPost, {
      headers: {
        Authorization: Auth.auth,
      },
    });
    let posts = await response.json();

    posts.forEach((post) => {
      const base64 = this.bufferToBase64(post.user.image.data);
      post.user.image = base64;
    });
    this.setState({ posts, isLoading: false });
  };

  fetchUser = async (query) => {
    let response = await fetch(this.url + query, {
      headers: {
        Authorization: Auth.auth,
      },
    });
    let user = await response.json();
    this.setState({ user });
    console.log(this.state.user);
  };
  fetchUsers = async () => {
    let response = await fetch(this.url, {
      headers: {
        Authorization: Auth.auth,
      },
    });
    let users = await response.json();
    this.setState({ users, isLoading: false });
    // console.log(this.state.users);
  };

  render() {
    const { user, users, experience, posts, loading } = this.state;
    return users && user ? (
      React.cloneElement(this.props.children, {
        users,
        user,
        experience,
        newFetch: () => this.fetchData(),
        posts,
        loading,
      })
    ) : (
      <div></div>
    );
  }
}

export default withRouter(DataSource);
