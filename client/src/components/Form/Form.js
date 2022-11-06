import React from 'react'
import './Form.css'

const Form = (props) => {
  return (
    <div className='container mt-5'>
        <div id="login-row" className="row align-items-center justify-content-center">
            <div id="login-column" className='col-md-6 py-3'>
                <div id="login-box" className='col-md-12'>
                    <form id="login-form" className='form' method="post" onSubmit={props.onSubmit}>
                        {props.children}
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Form