import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePostStore from '../store/postStore'
import useAuthStore from '../store/authStore'
import styles from './Detail.module.scss'

const Detail = () => {
  const { id } = useParams()
  const user = useAuthStore((state) => state.user)
  const posts = usePostStore((state) => state.posts)
  const updatePost = usePostStore((state) => state.updatePost)
  const post = posts.find((item) => {
    return String(item.id) === String(id)
  })
  const displayId = posts.findIndex((item) => String(item.id) === String(id)) + 1

  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(post ? post.title : '')
  const [writer, setWriter] = useState(post ? post.writer : '')
  const [content, setContent] = useState(post ? post.content : '')

  const updateFunction = async () => {
    if (!user) {
      alert('로그인 후 글을 수정할 수 있습니다')
      return
    }

    if (title.trim() === '' || content.trim() === '') {
      alert('모든 칸에 내용을 입력해주세요')
      return
    }

    try {
      await updatePost({
        id: post.id,
        title,
        writer: post.writer,
        content,
      })
      setIsEdit(false)
    } catch (error) {
      alert(error.message)
    }
  }

  const cancelEdit = () => {
    setTitle(post.title)
    setWriter(post.writer)
    setContent(post.content)
    setIsEdit(false)
  }

  if (!post) {
    return (
      <section className={styles.detailPage}>
        <h2 className={styles.main}>Post not found.</h2>
        <Link className={styles.linkButton} to="/">
          Back to list
        </Link>
      </section>
    )
  }

  return (
    <section className={styles.detailPage}>
      <h2 className={styles.main}>Post Detail</h2>

      {isEdit ? (
        <>
          <div className={styles.wrap}>
            <div className={styles.idField}>
              <strong>ID: </strong>
              {displayId}
            </div>
            <input
              className={styles.field}
              type="text"
              aria-label="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              className={styles.field}
              type="text"
              aria-label="writer"
              value={writer}
              disabled
              // onChange={(event) => setWriter(event.target.value)}
            />
            <textarea
              className={styles.contentField}
              aria-label="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={updateFunction}>
              Save
            </button>
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.wrap}>
            <div className={styles.idField}>
              <strong>ID: </strong>
              {displayId}
            </div>
            <div className={styles.field}>
              <strong>제목: </strong>
              {post.title}
            </div>
            <div className={styles.field}>
              <strong>글쓴이: </strong>
              {post.writer}
            </div>
            <div className={styles.contentField}>
              <strong>: </strong>
              {post.content}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            {user && (
              <button type="button" onClick={() => setIsEdit(true)}>
                Edit
              </button>
            )}
            <Link className={styles.linkButton} to="/">
              Back
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default Detail
