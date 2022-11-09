import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React from "react"
import { api } from "common/api"

interface UserForm {
  name: string,
  username: string,
  email: string,
  password: string
}

const SignupView = () => {
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: ""
  }

  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Required").max(15, "Name is too big"),
    username: Yup.string().required("Required").max(15, "Username is too big"),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters')
      .max(20, 'Password must be less than 20 characters')
  })

  const saveUser = async (user: UserForm) => {
    try {
      const response = await api.post("/api/createUser", user)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (user: UserForm) => {
    saveUser(user)
  }

  return (
    <div>
      <h1>Create your Instagram Account!</h1>
      <Formik
        onSubmit={(values) => onSubmit(values)}
        // @ts-ignore
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="name">
                Name
                <Field
                  name="name"
                  data-testid="name-input"
                  id="name"
                />
              </label>
              <ErrorMessage name="name" component="span" />
            </div>

            <div>
              <label htmlFor="username">
                Username
                <Field
                  name="username"
                  data-testid="username-input"
                  id="username"
                />
              </label>
              <ErrorMessage name="username" component="span" />
            </div>

            <div>
              <label htmlFor="email">
                Email
                <Field
                  name="email"
                  data-testid="email-input"
                  id="email"
                />
              </label>
              <ErrorMessage name="email" component="span" />
            </div>

            <div>
              <label htmlFor="password">
                password
                <Field
                  name="password"
                  data-testid="password-input"
                  id="password"
                  type="password"
                />
                <ErrorMessage name="password" component="span" data-testid="password" />
              </label>
            </div>
            <button
              data-testid="button-submit"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}>
              Log in
            </button>
          </Form>
        )
        }
      </Formik>
    </div>
  )
}

export default SignupView
