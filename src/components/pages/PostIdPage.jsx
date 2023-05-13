import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostServie';
import MyLoader from '../UI/Loader/MyLoader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [commentsPostById, setCommentsPostById] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [
    fetchCommentsByPostId,
    isLoadingCommentsByPostId,
    errorCommentsByPostId,
  ] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id);
    setCommentsPostById(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommentsByPostId(params.id);
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h1>Вы открыли страницу поста - {params.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div style={{ marginTop: 15 }}>
          {post.id}. {post.title}
        </div>
      )}
      <hr style={{ marginTop: 30 }} />
      <h1 style={{ marginTop: 30 }}>Комментарии</h1>

      {isLoadingCommentsByPostId ? (
        <MyLoader />
      ) : (
        <div>
          {commentsPostById.map((comment) => (
            <div key={comment.id} style={{ marginTop: 30 }}>
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
