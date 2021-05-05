import { useAPI } from './useAPI'
import * as React from 'react'

export interface IUserDetail {
    rate: {
        totalRating1: number
        totalRating2: number
        totalRating3: number
        totalRating4: number
        totalRating5: number
    }
    detail: {
        dob: string
        gender: string
        phone: number
        address: string
        avatar: string
        currentJob: string
        achievement: string[]
        totalQuestion: number
    }
    passportId: string
    loginType: string
    role: string
    level: number
    github: string
    skill: string[]
    bio: string
    matchingMentor: string[]
    currentPoint: number
    passwordChangedAt: string
    passwordResetToken: string
    passwordResetExpires: string
    createdAt: string
    _id: string
    reviews: string[]
    pointOutHistory: string[]
    pointInHistory: string[]
    username: string
    password: string
    email: string
    fullname: string
    __v: number
    modifieAt: string
    favoriteMentor: any[]
}

const { useState, useEffect } = React

export const useUserInfo = () => {
    const instance = useAPI()
    const [detail, setDetail] = useState<IUserDetail>()

    useEffect(() => {
        instance
            .get('/api/users')
            .then((response) => {
                if (response.status === 200) {
                    setDetail(response.data.data[0])
                }
            })
            .catch((error) => console.error(error))
    }, [])

    return detail
}
