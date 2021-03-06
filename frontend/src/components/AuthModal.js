import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Register from './Register'
import Login from './Login'
import { useTransition, animated } from 'react-spring'

const AuthModal = ({ onShut, isOpen, modalClose }) => {
  const [addClass, setAddClass] = useState('')

  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isOpen,
    delay: 200,
  })

  return ReactDom.createPortal(
    <>
      {transitions(
        (styles, isOpen) =>
          isOpen && (
            <animated.div
              style={styles}
              className='modal-wrapper'
              onClick={modalClose}
            >
              <div className={`modal-container ${addClass && addClass}`}>
                <i className='fas fa-times modal-close' onClick={onShut}></i>
                <div className='form-container sign-up-container'>
                  <Register onShut={onShut} />
                </div>
                <div className='form-container sign-in-container'>
                  <Login onShut={onShut} />
                </div>
                <div className='overlay-container'>
                  <div className='overlay'>
                    <div className='overlay-panel overlay-left'>
                      <h1 className='h1'>Welcome Back!</h1>
                      <p className='p'>
                        To keep connected with us please login with your
                        personal info
                      </p>
                      <button
                        className='modal-btn ghost'
                        id='signIn'
                        onClick={() => setAddClass('')}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className='overlay-panel overlay-right'>
                      <h1 className='h1'>Hello, Friend!</h1>
                      <p className='p'>
                        Enter your personal details and start journey with us
                      </p>
                      <button
                        className='modal-btn ghost'
                        id='signUp'
                        onClick={() => setAddClass('right-panel-active')}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>,
    document.getElementById('portal')
  )
}

export default AuthModal
