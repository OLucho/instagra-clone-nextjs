import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

export const LoginView = () => {
    const initialValues = {
        email: "",
        password: "",
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters')
            .max(20, 'Password must be less than 20 characters')
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div>
            <h1>Instagram</h1>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
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
                                <ErrorMessage name="password" component="span" data-testid="password"/>
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