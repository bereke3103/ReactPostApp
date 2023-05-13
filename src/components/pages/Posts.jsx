import { useEffect, useState } from 'react';
import '../../styles/App.css';
import PostList from '../PostList';
import PostForm from '../PostForm';
import PostFilter from '../PostFilter';
import MyModal from '../UI/modal/MyModal';
import MyButton from '../UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostServie';
import MyLoader from '../UI/Loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import MyPagination from '../UI/pagination/MyPagination';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    const totalCount = response.headers['x-total-count'];
    setPosts(response.data);

    setTotalPage(getPageCount(totalCount, limit));
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <MyLoader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} />
      )}

      <MyPagination page={page} changePage={changePage} totalPage={totalPage} />
    </div>
  );
}

export default Posts;
