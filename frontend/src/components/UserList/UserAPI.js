const API_URL = "http://127.0.0.1:8000/api/users/";

export const listUsers = async () => {
    return await fetch(API_URL);
};

export const getUser = async (userId = 0) => {
    return await fetch(`${API_URL}${userId}`);
};

/*export const registerUser = async (newUser) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstName": String(newUser.name).trim(),
            "lastName": String(newUser.foundation).trim(),
            "birthDate": String(newUser.website).trim(),
            "address": String(newUser.address).trim(),
            "phone": String(newUser.phone).trim(),
            "isActive": Boolean(newUser.isActive)
        })
    });
};*/

export const updateUser = async (userId, updatedUser) => {
    return await fetch(`${API_URL}${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        firstName: String(updatedUser.firstName).trim(),
        lastName: String(updatedUser.lastName).trim(),
        birthDate: String(updatedUser.birthDate).trim(),
        address: String(updatedUser.address).trim(),
        phone: String(updatedUser.phone).trim(),
        isActive: Boolean(updatedUser.isActive),
      }),
    });
};

export const deleteUser = async (userId) => {
    return await fetch(`${API_URL}${userId}`, {
        method: 'DELETE'
    });
};