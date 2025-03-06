import { CalculateTCID50 } from '../wailsjs/go/main/App';


export async function fetchTCID50(requestData) {
    return await CalculateTCID50(requestData);
}
