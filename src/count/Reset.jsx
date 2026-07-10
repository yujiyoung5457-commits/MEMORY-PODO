import React from 'react'
import useCounterStore from '../store/counterStore'
import styles from '../count/Reset.module.scss'

const Reset = () => {
  const { reset } = useCounterStore()

  return (
    <div>
      {/* <h2>리셋 버튼</h2> */}
      <br />
      <button className={styles.btn} onClick={reset}>초기화</button>
    </div>
  )
}

export default Reset
