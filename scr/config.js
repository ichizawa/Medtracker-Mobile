//export const BASE_URL = 'http://192.168.110.79:8001/medtrack/';
export const BASE_URL = 'https://medtrackerph.com/api/medtrack/';
export const processResponse = async (response) => { 
    try{
        const statusCode = response.status;                 //
        const data = response.json();                       //
        const res = await Promise.all([statusCode, data]);  //
        return ({                                           // get response from api
            statusCode: res[0],                             //
            data: res[1],                                   //
        });        
    } catch(e) {
        console.log(e);
    }
}