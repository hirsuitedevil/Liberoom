const BASE_URL = "http://localhost:5000"

export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res
    let data
    switch (method) {
        case 'GET':
            res = await fetch(BASE_URL + url, { headers })
            if(res.status !== 200 && res.status !== 201) throw new Error("ERROR")
            data = await res.json()
            return data

       case 'POST':
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, { headers, method, body });
                if (res.status !== 200 && res.status !== 201) {
                const errorData = await res.json();
                if (errorData && errorData.error === 'Email already exists') {
                    throw new Error(errorData.error);
                } else {
                    throw new Error('Server responded with an error');
                }
                }
                data = await res.json();
            } else {
                res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) });
                if (res.status !== 200 && res.status !== 201) {
                const errorData = await res.json();
                if (errorData && errorData.error === 'Email already exists') {
                    throw new Error(errorData.error);
                } else {
                    throw new Error(`Server responded with status ${res.status}`);
                }
                }
                data = await res.json();
            }
            return data;


        case 'PUT':
            res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify(body) })
            if(res.status !== 200 && res.status !== 201) throw new Error("ERROR")
            data = await res.json()
            return data

        case 'DELETE':
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, { headers, method, body });
            } else {
                res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) });
            }
            if(res.status !== 200 && res.status !== 201) throw new Error("ERROR")
            data = await res.json()
            return data
        default:
            return
    }
}