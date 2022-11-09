import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React from "react"
import { api } from "@/common/api"
import { useTitle } from "@/common/hooks"

interface UserForm {
    email: string,
    password: string
}

export const LoginView = () => {
  useTitle("Login to instagram")

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters')
      .max(20, 'Password must be less than 20 characters')
  })

  const handleLogin = async (user: UserForm) => {
    try {
      const response = await api.post("/api/login", user)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = (userForm: UserForm) => {
    handleLogin(userForm)
  }

  return (
        <div>
            <h1>Instagram</h1>
            <Formik
                onSubmit={values => onSubmit(values)}
                // @ts-ignore
                initialValues={{
                  email: "",
                  password: ""
                }}
                validationSchema={loginSchema}
            >
                {(formik) => (
                    <Form>
                        <div>
                            <label htmlFor="email">
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
                                <Field
                                    name="password"
                                    data-testid="password-input"
                                    id="password"
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
