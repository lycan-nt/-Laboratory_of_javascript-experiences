const client = {
    name: 'Felipe D. Santos',
    login: 'felipe',
    password: '123',
    account: 'nextDev',
    balance: 50.0
}

const add_money = (value) => {
    client.balance = client.balance + value;

}

const remove_money = (value) => {
    client.balance = client.balance - value;
}

const consult_balance = () => {
    console.log(`Balance: ${client.balance}`);
}

const consult_client = () => {
    console.log(`Name: ${client.name}`);
    console.log(`Login: ${client.login}`);
    console.log(`Password: ${client.password}`);
    console.log(`Account: ${client.account}`);
    console.log(`Balance: ${client.balance}`);
}


add_money(100);
remove_money(30);
consult_balance();
consult_client();