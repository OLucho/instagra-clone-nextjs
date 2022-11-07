import { useState } from "react"

export const LoginView = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div>
            <h1>Instagram</h1>
            <form onSubmit={onSubmit}>
                <input name="email"
                data-testid="email-input"
                    onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value
                    })} />
                <input name="password"
                data-testid="password-input"
                    onChange={(e) => setFormData({
                        ...formData,
                        password: e.target.value
                    })} />
                <button data-testid="button-submit">
                    Log in
                </button>
            </form>

        </div>
    )
}