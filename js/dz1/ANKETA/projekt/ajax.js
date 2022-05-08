let updatePassword = Math.random();
const Url = "https://fe.it-academy.by/AjaxStringStorage2.php";
const Name = 'KANNO_TETRIS_INFO';


function request(params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            ...params,
            success: resolve,
            error: reject
        });
    })
}

async function lockGetData() {
    updatePassword = Math.random();
    const data = await request({
        url: Url,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
            f: 'LOCKGET',
            n: Name,
            p: updatePassword
        }
    })
    if (data.error !== undefined) {
        alert('error');
        return
    }
    return JSON.parse(data.result)
}

function updateData(newList) {
    return request({
        url: Url,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
            f: 'UPDATE',
            n: Name,
            v: JSON.stringify(newList),
            p: updatePassword
        }
    })
}

function reedData() {
    return request({
        url: Url,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
            f: 'READ',
            n: Name
        },
    })
}

async function handleUpdateData(newList) {
    await lockGetData();
    await updateData(newList);
    const data = await reedData();
    return JSON.parse(data.result)
}

async function handleReedData() {
    //await lockGetData();
    const data = await reedData();
    return JSON.parse(data.result)
}

window.ajax = {
    lockGetData,
    updateData,
    reedData,
    handleUpdateData,
    handleReedData,
}