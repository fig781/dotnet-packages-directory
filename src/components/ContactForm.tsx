import { useRef, useState } from 'react'
import styles from '../styles/ContactForm.module.css'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  //Message after pressing submit
  const [displayMessage, setDisplayMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('text-danger')
  const [btnText, setBtnText] = useState('Submit')

  //Input Errors
  const [nameInputBorder, setNameInputBorder] = useState(false)
  const [emailInputBorder, setEmailInputBorder] = useState(false)
  const [messageInputBorder, setMessageInputBorder] = useState(false)

  //Form input values
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputMessage, setInputMessage] = useState('')

  const form: any = useRef()

  const sendEmail = async () => {
    try {
      let result = await emailjs.sendForm(
        'default_service',
        'template_omtgrvl',
        form.current,
        'user_dNmH7ZVQYYvWYI0MiEAHc'
      )
      setBtnText('Submit')
      setMessageColor('text-success')
      setDisplayMessage(true)
      setMessage('Message sent, thank you!')
      setInputName('')
      setInputEmail('')
      setInputMessage('')
      setTimeout(() => {
        setDisplayMessage(false)
      }, 3000)
    } catch (e) {
      setBtnText('Submit')
      setMessageColor('text-danger')
      setDisplayMessage(true)
      setMessage('Error sending message')
      setTimeout(() => {
        setDisplayMessage(false)
      }, 3000)
      console.log(e)
    }
  }

  const onSubmitClick = (e: any) => {
    e.preventDefault()

    //Check if input values exist
    if (inputName === '' || inputEmail === '' || inputMessage === '') {
      if (inputName === '') {
        setNameInputBorder(true)
        setTimeout(() => {
          setNameInputBorder(false)
        }, 3000)
      }

      if (inputEmail === '') {
        setEmailInputBorder(true)
        setTimeout(() => {
          setEmailInputBorder(false)
        }, 3000)
      }

      if (inputMessage === '') {
        setMessageInputBorder(true)
        setTimeout(() => {
          setMessageInputBorder(false)
        }, 3000)
      }

      setMessageColor('text-danger')
      setMessage('Value missing')
      setDisplayMessage(true)
      setTimeout(() => {
        setDisplayMessage(false)
      }, 3000)

      return
    }

    setBtnText('Sending...')

    sendEmail()
  }

  return (
    <form ref={form} onSubmit={onSubmitClick} className={styles.form}>
      <h2>Contact</h2>
      <p>Let us know if we missed any great Dot Net packages.</p>
      <div className={styles.upperContainer}>
        <div className={styles.upperInner}>
          <label htmlFor='form-name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className={styles.input}
            id='form-name'
            name='form-name'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className={styles.upperInner}>
          <label htmlFor='form-email' className='form-label'>
            Email Address
          </label>
          <input
            type='email'
            className={styles.input}
            id='form-email'
            aria-describedby='emailHelp'
            name='form-email'
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
      </div>


      <div>
        <label htmlFor='form-message' className='form-label'>
          Message
        </label>
        <textarea
          className={`${messageInputBorder && 'border-danger'} form-control`}
          id='form-message'
          rows={3}
          name='form-message'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          id='submit-button'
          type='submit'
          className={`btn ${styles.btnContact}`}
        >
          {btnText}
        </button>
        {displayMessage && (
          <p className={`${messageColor} ${styles.formMessage}`}>{message}</p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
