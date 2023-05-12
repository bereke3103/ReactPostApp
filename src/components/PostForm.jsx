import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
  //!1
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');

  //!2
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();

    //!1
    // const newPost = {
    //   id: Date.now(),
    //   title: title,
    //   body: body,
    // };
    // setPosts([...posts, newPost]);

    //!2
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);

    //!1
    // setTitle('');
    // setBody('');

    //!2
    setPost({ title: '', body: '' });
  };

  return (
    <form>
      <MyInput
        value={post.title}
        //!1
        // onChange={(e) => setTitle(e.target.value)}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        //!2
        // onChange={(e) => setBody(e.target.value)}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost} type="submit">
        Создать пост
      </MyButton>
    </form>
  );
};

export default PostForm;
