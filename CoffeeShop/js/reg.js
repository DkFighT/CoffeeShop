// регистрация
function registre()
{
    let login_content = document.getElementById('content');
    login_content.remove();
    let log = document.getElementById('header');
    log.insertAdjacentHTML('afterend', `<div class="content centering_text" id="content"><span class="font_size_48">Registration</span><div style="width: 35%;" id="main"><div id="login_content" style="width: 100%;"><form onsubmit="return correction();" class="login_form" name="login_form"><p class="font_size_20">E-mail</p><br><input class="fields font_size_20" type="email" placeholder="E-mail" required name="nikname" id="1"><br><br><p class="font_size_20">Password</p><br><input class="fields font_size_20" id="first" type="text" placeholder="Password" required name="first"><br><br><p class="font_size_20">One more password</p><br><input class="fields font_size_20" type="text" placeholder="One more password" required name="sec" id="sec"><br><br><button type="submit" id="login" type="submit">Registr</button></form></div></div><button class="no_acc" id="login_reg" onclick="log()">Have account, Sign In</button></div>`);
}
// логин
function log()
{
    let login_content = document.getElementById('content');
    login_content.remove();
    let log = document.getElementById('header');
    log.insertAdjacentHTML('afterend', `<div class="content centering_text" id="content"><span class="font_size_48">Login</span><div style="width: 35%;" id="main"><div style="width: 100%;" id="login_content"><form onsubmit="return sign_in()" name="login_form" style="width: 100%;">
    <p class="font_size_20">E-mail</p><br>
    <input type="email" placeholder="E-mail" required name="nikname" class="fields font_size_20"><br><br>
    <p class="font_size_20">Password</p><br>
    <input type="text" placeholder="Password" required name="first" class="fields font_size_20">
    <br><br>
    <button id="login" type="submit">Login</button>
    </form></div></div><button class="no_acc" id="login_reg" onclick="registre()">No account? Registration</button></div>`);
}
// Создание бд
var db = openDatabase('login_pass', '1.0', 'login pass', 2 * 1024 * 1024);
// Создание таблицы
function createTable(db) { 
    db.transaction(function (t) { 
        t.executeSql("CREATE TABLE LOGINS(email TEXT, password TEXT)", []); 
    });
}
createTable(db);
// заполнение бд
function insertData(db, email, password) {
    db.transaction(function (e) { 
        e.executeSql("INSERT INTO LOGINS(email, password) VALUES (?, ?)", [email, password]); 
    }); 
}

// поиск совпадающих email
function dateView(db){
    let mail = document.getElementById('1').value;
    let flag = true;
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM LOGINS", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                let email = r.rows.item(i).email;
                if(email == mail){
                    flag = false;
                    break;
                }
            }
            let first_field = document.getElementById('first').value;
            let second_field = document.getElementById('sec').value;
            // Проверка на существование пользователя
            if(flag != true){
                alert('Данный пользователь уже существует');
            }
            // проверка на совпадение паролей
            else if(first_field == second_field){
                // ДОБАВИТЬ EMAIL В БД
                // ДОБАВИТЬ ПАРОЛЬ В БД
                insertData(db, document.getElementById('1').value, first_field);
                window.location.replace(`../html/thx.html?email=${document.login_form.nikname.value}`); 
            }
            else{
                alert('Пароли не совпадают!') 
            }
        }
        );
    });
}
function correction(){
    dateView(db);
    return false;
}
function check_data(db){
    let mail = document.login_form.nikname.value;
    let first_field = document.login_form.first.value;
    let flag = true;
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM LOGINS", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                let email = r.rows.item(i).email;
                let passwords = r.rows.item(i).password;
                if(email == mail && passwords == first_field){
                    flag = false;
                    break;
                }
            }
            // Проверка на существование пользователя
            if(flag != false){
                alert('Неверный логин или пароль')
            }
            else{
                window.location.replace(`../html/profile.html?email=${document.login_form.nikname.value}`); 
            }
        }
        );
    });
}
function sign_in(){
    check_data(db);
    return false;
}