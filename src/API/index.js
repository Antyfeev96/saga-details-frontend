export default class API {
    constructor() {
        this.url = 'http://localhost:7070/api';
    }

    async fetchItems() {
        try {
            const response = await fetch(`${this.url}/services`);
            return await response.json();
        } catch (e) {
            throw new Error(e)
        }
    }

    async fetchItem(id) {
        try {
            const response = await fetch(`${this.url}/services/${id}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (e) {
            throw new Error(e)
        }
    }
}