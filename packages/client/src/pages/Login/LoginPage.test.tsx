import LoginPage from './LoginPage'
import { render, screen, within } from '@testing-library/react'
import React from 'react'

test('should show login form', () => {
    render(<LoginPage />)

    expect(
        screen.getByRole('tab', {
            name: /đăng nhập/i,
        })
    ).toHaveTextContent('Đăng nhập')

    expect(
        screen.getByRole('tab', {
            name: /đăng ký/i,
        })
    ).toHaveTextContent('Đăng ký')
    const button = screen.getByRole('button', {
        name: /đăng nhập/i,
    })

    within(button).getByText(/đăng nhập/i)
})
