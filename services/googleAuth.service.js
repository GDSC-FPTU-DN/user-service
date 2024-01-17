const axios = require('axios')

async function getUserByAccessToken(accessToken) {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getUserByAccessToken
}