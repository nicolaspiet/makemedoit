import axios from 'axios'

const baseURL = 'https://makemedoit-api.onrender.com'

const registerUser = async (username, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const { data } = await axios.post(
            `${baseURL}/register`,
            { username, password },
            config
        )
        
        return data

    } catch (error) {
        console.error(error)
    }
}

const loginUser = async (username, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const { data } = await axios.post(
            `${baseURL}/login`,
            { username, password },
            config
        )
        return data
            
    } catch (error) {
        console.error(error)
    }
}


export default {loginUser, registerUser};