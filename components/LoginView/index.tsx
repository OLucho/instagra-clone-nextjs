import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React, { useState } from "react"
import { api } from "@/common/api"
import { useTitle } from "@/common/hooks"
import { User } from "@/common/types"

interface UserForm {
  email: string,
  password: string
}

export const LoginView = ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<User | null>> }) => {
  const [serverError, setServerError] = useState("")
  useTitle("Login to instagram")

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters')
      .max(20, 'Password must be less than 20 characters')
  })

  const handleLogin = async (user: UserForm) => {
    const { status, data } = await api.post("/api/login", user)
    if (status !== 200) {
      setServerError(data.error)
      return
    }
    setUser(data.user)
    localStorage.setItem("user", JSON.stringify(data.user))
  }
  const onSubmit = (userForm: UserForm) => {
    handleLogin(userForm)
  }

  const inputsData = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      "data-testid": "email-input"
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      "data-testid": "password-input"
    }
  ]

  return (
    <div>
      <h1>Instagram</h1>
      {serverError && <p>{serverError}</p>}
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
            {inputsData.map((input) => (
              <div key={input.name}>
                <Field {...input} />
                <ErrorMessage name={input.name} />
              </div>
            ))}
            <button
              data-testid="button-submit"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}>
              Log in
            </button>
            ))
          </Form>
        )
        }
      </Formik>
    </div>
  )
}
