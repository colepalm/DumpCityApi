import axios, { AxiosInstance } from 'axios';

export class PtService {
    public client: AxiosInstance

    constructor() {
        const ptBaseUrl = 'https://www.phantasytour.com/api';

        this.client = axios.create({
            baseURL: ptBaseUrl,
            timeout: 1000,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}