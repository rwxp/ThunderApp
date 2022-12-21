const API_URL = "http://127.0.0.1:8000/api/users/";

export const listUsers = async () => {
    return await fetch(API_URL);
};

export const getUser = async (userId = 0) => {
    return await fetch(`${API_URL}${userId}`);
};

export const registerUser = async (id, firstName, lastName, birthdate, address, phone
      , password, role, isActive) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": String(id).trim(),
            "firstName": String(firstName).trim(),
            "lastName": String(lastName).trim(),
            "birthDate": String(birthdate).trim(),   
            "address": String(address).trim(),
            "phone": String(phone).trim(),   
            "password": String(password).trim(),
            "role": String(role).trim(),
            "isActive": String(isActive).trim()
        })
    });
};

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
        role: String(updatedUser.role).trim(),
        isActive: Boolean(updatedUser.isActive),
      }),
    });
};

export const deleteUser = async (userId) => {
    return await fetch(`${API_URL}${userId}`, {
        method: 'DELETE'
    });
};

export const verifyUser = async(usuario, contra, rol)=>{
    return await fetch(API_URL+'verifyUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": String(usuario).trim(),
            "password": String(contra).trim(),
            "role": String(rol).trim()
        })
    });
}
