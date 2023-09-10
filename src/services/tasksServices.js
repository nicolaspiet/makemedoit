import axios from 'axios'

const baseURL = 'https://makemedoit-api.onrender.com'

const createTask = async (task, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    try {
        const { data } = await axios.post(
            `${baseURL}/tasks`,
            task,
            config
        )
        return data

    } catch (error) {   
        console.error(error)
    }
}

const getTasks = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(
            `${baseURL}/tasks`,
            config
        )
        
        return data

    } catch (error) {   
        // if status is 429 (too many requests), return a stauts of 429
        if (error.response.status === 429) {
            return error.response.status
        }
    }
}

const deleteTask = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    try {
        const { data } = await axios.delete(
            `${baseURL}/tasks/delete/${id}`,
            config
        )
        return data

    } catch (error) {   
        console.error(error)
    }
}

// update task function
const updateTask = async (task, id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    try {
        const { data } = await axios.put(
            `${baseURL}/tasks/edit/${id}`,
            task,
            config
        )
        return data
    }
    catch (error) {
        console.error(error)
    }
}


export default {createTask, getTasks, deleteTask, updateTask};