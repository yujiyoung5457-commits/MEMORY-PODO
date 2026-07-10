import React, { useEffect, useRef, useState } from 'react'
import arms from '../assets/arms.svg'
import body from '../assets/body.svg'
import eyes from '../assets/eyes.svg'
import reg from '../assets/reg.svg'
import talk from '../assets/talk.svg'
import styles from './PodoCharacter.module.scss'

const PodoCharacter = () => {
  const characterRef = useRef(null)
  const idleTimerRef = useRef(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const trackMouse = (event) => {
      const character = characterRef.current

      if (!character) {
        return
      }

      const rect = character.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = event.clientX - centerX
      const distanceY = event.clientY - centerY
      const maxOffset = Math.max(6, rect.width * 0.045)
      const nextX = Math.max(-maxOffset, Math.min(maxOffset, distanceX * 0.055))
      const nextY = Math.max(-maxOffset, Math.min(maxOffset, distanceY * 0.055))

      setEyeOffset({ x: nextX, y: nextY })
      setIsTracking(true)

      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = window.setTimeout(() => {
        setIsTracking(false)
        setEyeOffset({ x: 0, y: 0 })
      }, 900)
    }

    window.addEventListener('mousemove', trackMouse)

    return () => {
      window.removeEventListener('mousemove', trackMouse)
      window.clearTimeout(idleTimerRef.current)
    }
  }, [])

  return (
    <div
      ref={characterRef}
      className={`${styles.character} ${isTracking ? styles.tracking : ''}`}
      style={{
        '--eye-x': `${eyeOffset.x}px`,
        '--eye-y': `${eyeOffset.y}px`,
      }}
      aria-label="Memory Podo character"
    >
      <img className={`${styles.arm} ${styles.leftArm}`} src={arms} alt="" />
      <img className={`${styles.arm} ${styles.rightArm}`} src={arms} alt="" />
      <img className={`${styles.leg} ${styles.leftLeg}`} src={reg} alt="" />
      <img className={`${styles.leg} ${styles.rightLeg}`} src={reg} alt="" />
      <img className={styles.talk} src={talk} alt="" />
      <img className={styles.body} src={body} alt="" />
      <img className={styles.eyes} src={eyes} alt="" />
    </div>
  )
}

export default PodoCharacter
