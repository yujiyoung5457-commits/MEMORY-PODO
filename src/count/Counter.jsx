import React from 'react'
import useCounterStore from '../store/counterStore'
import styles from './Counter.module.scss'

const Counter = () => {
  const { count, increase, decrease, reset } = useCounterStore()

  return (
    <div className={styles.counterBox}>
      <h2>🍇가 {count}개</h2>
      <button className={styles.btm} onClick={increase}>더하기</button>
      <button className={styles.btm} onClick={decrease}>빼기</button>
      <button className={styles.btm} onClick={reset}>초기화</button>
    </div>
  )
}

export default Counter
