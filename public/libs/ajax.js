export class Ajax {
    send = (url, method, data) => {
        return fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'x-requested-with'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: (method === 'POST') ? JSON.stringify(data) : null, // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }
    
    post = (url, data) => {
        return this.send(url, 'POST', data);
    }

    get = (url, data) => {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        return this.send(url + '?' + query.join('&'), 'GET');
    }
}

