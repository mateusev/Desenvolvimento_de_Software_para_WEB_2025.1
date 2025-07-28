const myPromise = new Promise(
    (resolve, reject) => {
        //houve uma comunicação externa
        const res = 4;
        if(res % 2 === 0) resolve("OK: " + res);
        else reject ("NOK: " + res)
    }
)

function getAPI(url) {
    return myPromise;
}

function myClient() {
    getAPI("http://fake.com/dados");
}