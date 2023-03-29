console.log("123");

async function start() {
    return await Promise.resolve('async working!')
}

start().then(console.log)