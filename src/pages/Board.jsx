import React from 'react'
import Login from '../components/Login'
import PodoCharacter from '../components/PodoCharacter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import basket from '../assets/basket.svg'
import grape from '../assets/grape.svg'
import styles from './Board.module.scss'

const Board = () => {
  return (
    <main className={styles.main}>
      <div className={styles.grapeWrap} aria-hidden="true">
        <img className={styles.grape} src={grape} alt="" />
        <span className={styles.grapeDrop} />
      </div>
      <img className={styles.basket} src={basket} alt="" aria-hidden="true" />
      <div className={styles.topArea}>
        <div className={styles.boardArea}>
          <h2 className={styles.font}>React CRUD Board</h2>
          <PostForm />
        </div>
        <div className={styles.loginArea}>
          <Login />
        </div>
      </div>
      <PodoCharacter />
      <PostList />
    </main>
  )
}

export default Board
