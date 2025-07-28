console.log("hello, world");


//função em formato clássico
function soma(num1, num2) {
    return num1 + num2;
}

//função anônima ou função arrow(seta)
const subtrai_arrow = (num1, num2) => {
    return num1 - num2;
};

//função arrow sem corpo
subtrai_arrow_sem_corpo = (num1, num2) => num1 - num2;

//exemplo de uso de uma função callback
function soma_num_callback(num1, num2, callback) {
    res = num1 + num2;
    callback(res);
    return res;

}

console.log(soma(10, 5));
console.log(subtrai_arrow(2,3))