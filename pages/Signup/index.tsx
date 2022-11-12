import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import React, { useState } from "react"
import { api } from "@/common/api"
import { useTitle } from "@/common/hooks"
import { useRouter } from "next/router"

interface UserForm {
  name: string,
  username: string,
  email: string,
  password: string
}

const SignupView = () => {
  const [serverError, setServerError] = useState(false)

  useTitle("Create an account!")
  const router = useRouter()

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: ""
  }

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Required").max(15, "Name is too big"),
    username: Yup.string().required("Required").max(15, "Username is too big"),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters')
      .max(20, 'Password must be less than 20 characters')
  })

  const onSubmit = async (user: UserForm) => {
    const { data, status } = await api.post("/api/createUser", user)
    if (status !== 200) {
      setServerError(data.error)
      return
    }
    setServerError(false)
    localStorage.setItem("user", JSON.stringify(data.user))
    router.push("/")
  }

  const inputsData = [
    { name: "name", type: "text", placeholder: "Name", "data-testid": "name-input" },
    { name: "username", type: "text", placeholder: "Username", "data-testid": "username-input" },
    { name: "email", type: "text", placeholder: "Email", "data-testid": "email-input" },
    { name: "password", type: "password", placeholder: "Password", "data-testid": "password-input" }
  ]

  return (
    <div>
      <h1>Create your Instagram Account!</h1>
      {serverError && <p>{serverError}</p>}
      <Formik
        onSubmit={(values) => onSubmit(values)}
        initialValues={initialValues}
        validationSchema={signUpSchema}
      >
        {(formik) => (
          <Form>
            {inputsData.map(input => (
              <div key={input.name}>
                <Field {...input} />
                <ErrorMessage
                  name={input.name}
                />
              </div>
            ))}
            <button
              data-testid="button-submit"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export async function getServerSideProps () {
  return {
  }
}

export default SignupView
