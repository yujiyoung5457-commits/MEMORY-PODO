import React from 'react'
import { Link } from 'react-router-dom'
import usePostStore from '../store/postStore'
import styles from './PostList.module.scss'
import useAuthStore from '../store/authStore'

const PostList = () => {
  const user = useAuthStore((state) => state.user)
  const posts = usePostStore((state) => state.posts)
  const deletePost = usePostStore((state) => state.deletePost)
  const loading = usePostStore((state) => state.loading)
  const error = usePostStore((state) => state.error)

  return (
    <section className={styles.listSection}>
      <h3 className={styles.main}>🙋‍♀️Post List🙎‍♀️</h3>
      {error && <p>{error}</p>}
      {loading && <p>불러오는 중입니다</p>}
      {posts.length === 0 ? (
        <h3>No posts.</h3>
      ) : (
        <table className={styles.wrap}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link className={styles.titleLink} to={`/detail/${item.id}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.writer}</td>
                  <td className={styles.btnBox}>
                    {user ? (
                      <>
                        <Link className={styles.btn} to={`/detail/${item.id}`}>
                          Edit
                        </Link>
                        <button className={styles.btn} onClick={() => deletePost(item.id)}>
                          Delete
                        </button>
                      </>
                    ) : (
                      <span>로그인 필요</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default PostList
