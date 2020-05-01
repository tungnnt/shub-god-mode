const request = require('request');
const axios = require('axios');

function randomNumberPhone(length) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomPassword(length) {
    let result = '';
    let characters = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const signUp = () => {
    let phone = randomNumberPhone(10);
    let password = randomPassword(10);
    let options = {
        'method': 'POST',
        'url': 'https://api.shub.edu.vn/signup',
        'headers': {
            'authority': 'api.shub.edu.vn',
            'authorization': 'Bearer undefined',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
            'content-type': 'application/json',
            'accept': '*/*',
            'origin': 'https://shub.edu.vn',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://shub.edu.vn/signup',
            'accept-language': 'en-US,en;q=0.9',
            'Content-Type': 'text/plain'
        },
        body: `{\"username\":\"${phone}\",\"password\":\"${password}\",\"email\":\"${phone}@gmail.com\",\"name\":\"\",\"school\":\"\",\"role\":\"hs\",\"submiting\":false}`
    };
    //console.log(phone,password);
    return new Promise(async (resolve, reject)=>{
        await request(options, function (error, response) { 
                if (error) return reject(error);
                resolve(JSON.parse(response.body));
            });
    })
}

const getClassInfo = (classId, userToken) => {
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://shub.edu.vn/class/find',
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"classes.findOneToEnroll","class_id":classId};
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getInClass = (classId, userToken, password) => {
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://shub.edu.vn/class/find',
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"users_classes.enroll","class_id":classId,"enroll_pass":password};
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getTestInfo = (classId, userToken) => {
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://shub.edu.vn/class/${classId}/info`,
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"tests.getByClass2","class_id":classId,"limit":10,"skip":0};
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getTestDocument = (classId,testId, userToken) => {
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://shub.edu.vn/class/${classId}/homework/${testId}/test`,
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"tests.getFileLink","test_id":testId};
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const doTest = (classId,testId,userToken,userAns) => {
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://shub.edu.vn/class/${classId}/homework/${testId}/test`,
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"user_test.insert","test_id":testId,"ans_key":userAns,"duration":10.000}
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getAnswer = (classId,testId,userToken)=>{
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://shub.edu.vn/class/${classId}/homework/${testId}/test`,
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"user_test.findOne","test_id":testId,"user_id":null}
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const leaveClass = (classId,userToken)=>{
    let headers = {
        'authority': 'api.shub.edu.vn',
        'authorization': `Bearer ${userToken}`,
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36',
        'content-type': 'application/json',
        'accept': '*/*',
        'origin': 'https://shub.edu.vn',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://shub.edu.vn/class/${classId}/info`,
        'accept-language': 'en-US,en;q=0.9',
        'Content-Type': 'text/plain'
    };
    
    let api = 'https://api.shub.edu.vn/api';

    let data = {"api":"users_classes.leave","class_id":classId};
    
    return new Promise((resolve, reject) => {
        axios.post(api, data, {headers: headers})
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

async function tryAnswer (classID, password, testID, numberOfQuestions,userAns){
    return new Promise(async(resolve,reject)=>{
        let signUp_Response = await signUp().catch(err => {return reject(err)});
        if (signUp_Response){
            let userToken = signUp_Response.token;
            //console.log(`Bearer ${userToken}`);
            let getClassInfo_Response = await getClassInfo(classID,userToken).catch(err => {return reject(err)});;
            if (getClassInfo_Response){
                let getInClass_Response = await getInClass(classID,userToken, password).catch(err => {return reject(err)});;
                if (getInClass_Response){
                    //console.log(getInClass_Response);
                    let getTestInfo_Response = await getTestInfo(classID,userToken).catch(err => {return reject(err)});;
                    if (getTestInfo_Response){
                        //console.log(getTestInfo_Response);
                        let getTestDocument_Response = await getTestDocument(classID,testID, userToken).catch(err => {return reject(err)});;
                        if (getTestDocument_Response){
                            //console.log(getTestDocument_Response);
                            let ansArray = [];
                            for (i=0;i<numberOfQuestions;i++){
                                let ans = (i === userAns.index - 1 ? userAns.key : null);
                                ansArray.push(ans)
                            }
                            // console.log(ansArray);
                            let doTest_Response = await doTest(classID,testID,userToken,ansArray).catch(err => {return reject(err)});;
                            if (doTest_Response){
                                let getAnswer_Response = await getAnswer(classID,testID,userToken).catch(err => {return reject(err)});;
                                if (getAnswer_Response){
                                    // console.log(getAnswer_Response);
                                    let leaveClass_Response = await leaveClass(classID,userToken).catch(err => {return reject(err)});;
                                    if (leaveClass_Response){
                                        //console.log(leaveClass_Response);
                                    }
                                    resolve({
                                        triedAns: userAns,
                                        isAnsTrue: getAnswer_Response.result.dung == 1 ? true : false,
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }   
    })
}
module.exports = {
    tryAnswer,
}
//tryAnswer('XBIAR', '123456', 503471, 10, {index: 1, key: 'A'});