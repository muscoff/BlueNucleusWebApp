import { geturl, getsingleurl, posturl, puturl, deleteurl } from './url'

const route = 'usertasks'

export const getThisUserTask = async(userid, resFunc, errFunc) => {
    try {
        const response = await fetch(geturl(`${route}/userid?userid=${userid}`))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}

export const getUserTask = async(id, resFunc, errFunc) => {
    try {
        const response = await fetch(getsingleurl(route, id))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}

export const getUserTasks = async (resFunc, errFunc) => {
    try {
        const response = await fetch(geturl(route))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}

export const postUserTask = async (body, resFunc, errFunc) => {
    try {
        const response = await fetch(...posturl(route, body))
        const data = await response.json()
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: data.message})
    } catch (error) {
        return errFunc(error.message)
    }
}

export const putUserTask = async (body, resFunc, errFunc) => {
    try {
        const response = await fetch(...puturl(route, body))
        const data = await response.json()
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: data.message})
    } catch (error) {
        return errFunc(error.message)
    }
}

export const deleteUserTask = async (id, resFunc, errFunc) => {
    try {
        const response = await fetch(...deleteurl(route, id))
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: 'Failed to delete user task'})
    } catch (error) {
        return errFunc(error.message)
    }
}