// Использовал хуки useState и useEffect для хранения состояния пользователей, постов и выбранного пользователя. 
// Методы fetch использовал для загрузки данных из JSON файлов. 
// Aункциz renderUserList и renderUserPosts используются для отображения списка пользователей и соответствующих им постов.
// При клике на пользователя, функция setSelectedUser вызывается с передачей выбранного пользователя, что приводит к отображению списка его постов.

import React, { useState, useEffect }   from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Загрузка данных пользователей
  useEffect(() => {
    fetch('users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Загрузка данных постов
  useEffect(() => {
    fetch('posts.json')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Функция для отображения списка пользователей
  const renderUserList = () => {
    return (
      <div>
        <h2>Список пользователей</h2>
        {users.map((user) => (
          <div key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name}
          </div>
        ))}
      </div>
    );
  };

  // Функция для отображения постов пользователя
  const renderUserPosts = () => {
    const userPosts = posts.filter((post) => post.userId === selectedUser.id);

    return (
      <div>
        <h2>Посты пользователя: {selectedUser.name}</h2>
        {userPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {selectedUser ? (
        renderUserPosts()
      ) : (
        renderUserList()
      )}
    </div>
  );
}

export default App;

