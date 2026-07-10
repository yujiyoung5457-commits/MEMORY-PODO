import React, { useState } from 'react'
import usePostStore from '../store/postStore'
import styles from './PostForm.module.scss'
import useAuthStore from '../store/authStore'

const PostForm = () => {
  const [title, setTitle] = useState('')
  // const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')

  const addPost = usePostStore((state) => state.addPost)
  const loading = usePostStore((state) => state.loading)
  const user = useAuthStore((state) => state.user)

  const submitB = async () => {
    if (!user) {
      alert('로그인 후 글을 작성할 수 있습니다')
      return
    }

    if (title.trim() === '' || content.trim() === '') {
      alert('모든 칸에 내용을 입력해주세요')
      return
    }

    try {
      const newPost = {
        title,
        writer: user.email,
        content,
        uid: user.uid,
      }

      await addPost(newPost)

      setTitle('')
      // setWriter('')
      setContent('')
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className={styles.formBox}>
      <h2>🍇🙎‍♀️🙋‍♀️👾</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="제목 입력"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="로그인하면 작성자가 자동으로 들어갑니다"
        value={user?.email || ''}
        readOnly
      />
      <input
        className={styles.input}
        type="text"
        placeholder="글 내용 입력"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button className={styles.btn} onClick={submitB} disabled={loading}>
        {loading ? '등록중' : '등록'}
      </button>
    </div>
  )
}

export default PostForm
