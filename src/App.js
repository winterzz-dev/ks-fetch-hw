import React from "react";
import { Table, Modal, Row, Col } from "antd";
import "antd/dist/antd.css";

export default class App extends React.Component {
  state = {
    usersData: [],
    modalVisible: false,
    posts: []
  };

  columnsUsers = [
    {
      title: "Записи",
      dataIndex: "id",
      key: "id",
      render: text => (
        <a onClick={() => this.showUserPosts(text)}>Посмотреть записи</a>
      )
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Никнейм",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone"
    }
  ];

  columnsPosts = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body"
    }
  ];

  async showUserPosts(id) {
    this.setState({
      modalVisible: true
    });
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    let posts = await response.json();
    posts.forEach(item => {
      item.key = item.id;
    });
    this.setState({ posts });
  }

  closePostsModal() {
    this.setState(state => {
      return {
        modalVisible: false
      };
    });
  }

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();
    users.forEach(item => {
      item.key = item.id;
    });
    this.setState({ usersData: users });
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col span={12} offset={6}>
            <Table
              dataSource={this.state.usersData}
              columns={this.columnsUsers}
            />
            ;
          </Col>
        </Row>
        <Modal
          title="Записи пользователя"
          visible={this.state.modalVisible}
          onOk={this.closePostsModal.bind(this)}
          onCancel={this.closePostsModal.bind(this)}
        >
          <Table dataSource={this.state.posts} columns={this.columnsPosts} />
        </Modal>
      </div>
    );
  }
}
