const prompt = require('prompt');

const {tryAnswer} = require('./index');

prompt.start();
let classSchema = {
    properties: {
        classID: {
            description: "Nhập mã lớp: "
        },
        classPassword: {
            description: "Nhập mã bảo vệ của lớp: "
        },
        testID: {
            description: "Nhập mã bài kiểm tra: "
        },
        numberOfQuestions: {
            description: 'Nhập số câu hỏi của bài kiểm tra: ',
        }
    }
};

let questionSchema = {
    properties: {
        question: {
            description: "Nhập câu cần tìm đáp án: "
        },
    }
};

let decisionSchema = {
    properties: {
        decision: {
            description: "Bạn có muốn tiếp tục không (Y/N): "
        },
    }
};

function requestForNewQuestion (classInput){
    let {classID,classPassword,testID,numberOfQuestions} = classInput;
    prompt.get(questionSchema, async function (err, questionInput) {
        if (err) {console.log("\nTool đã dừng hoạt động."); return;}
        let rightAns = "";
        await Promise.all(['A','B','C'].map(async key => {
            let response = await tryAnswer(classID,
                                           classPassword,
                                           parseInt(testID, 10),
                                           numberOfQuestions,
                                           {index: questionInput.question, key:key},
                                           ).catch(err => {console.log("\nLỗi trong qúa trình thử đáp án.",err); return;})
            if (response){
                if (response.isAnsTrue) rightAns = key;
                console.log(`Thử khoanh đáp án ${key}, cho kết quả ${response.isAnsTrue === true ? "đúng": "sai"}`);
            }
        }))
        console.log(`=> Câu ${questionInput.question} khoanh đáp án ${rightAns === "" ? "D": rightAns}`);
        await requestForNewQuestion(classInput);
    });
}

async function run(){
    console.log("Ấn Ctrl + C bất cứ lúc nào để thoát tool.");
    prompt.get(classSchema, async function (err, classInput) {
        if (err) {console.log("\nTool đã dừng hoạt động."); return;}
        //let {classID,classPassword,testID,numberOfQuestions} = classInput;
        await requestForNewQuestion(classInput);
    });
}

run();