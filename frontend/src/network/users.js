import { geturl } from "./url"

const route = 'users/getUsers'

export const getusers = async(resFunc, errFunc)=> {
    try {
        const response = await fetch(geturl(route))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}