const baseUrl = 'http://localhost:3005/api/users';

const getAllUsers = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result.users;
};

const getUserById = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();

    return result.user;
};

const createUser = async (userData) => {
    const { country, city, street, streetNumber, ...data } = userData;
    data.address = {
        country,
        city,
        street,
        streetNumber
    };

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result.user;
};

export {
    getAllUsers,
    getUserById,
    createUser
}