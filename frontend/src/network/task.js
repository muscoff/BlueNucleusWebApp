import { geturl, getsingleurl, posturl, puturl, deleteurl } from './url'

const route = 'tasks'

export const getTask = async(id, resFunc, errFunc) => {
    try {
        const response = await fetch(getsingleurl(route, id))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}

export const getTasks = async (resFunc, errFunc) => {
    try {
        const response = await fetch(geturl(route))
        const data = await response.json()
        return resFunc(data)
    } catch (error) {
        return errFunc(error.message)
    }
}

export const postTask = async (body, resFunc, errFunc) => {
    try {
        const response = await fetch(...posturl(route, body))
        const data = await response.json()
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: data.message})
    } catch (error) {
        return errFunc(error.message)
    }
}

export const putTask = async (body, resFunc, errFunc) => {
    try {
        const response = await fetch(...puturl(route, body))
        const data = await response.json()
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: data.message})
    } catch (error) {
        return errFunc(error.message)
    }
}

export const deleteTask = async (id, resFunc, errFunc) => {
    try {
        const response = await fetch(...deleteurl(route, id))
        if(response.ok) return resFunc({status: true})
        return errFunc({status: false, message: 'Failed to delete task'})
    } catch (error) {
        return errFunc(error.message)
    }
}