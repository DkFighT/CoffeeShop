let db = openDatabase('webDB', '1.0', 'Test DB', 2 * 1024 * 1024);
let param = (new URL(document.location)).searchParams;

// подгрузка бд с загрузкой страницы
function load_data(){
    let table = document.getElementById('tbody');
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM METKA", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                var email = r.rows.item(i).email;
                if(email == param.get('email')){
                    var phone = r.rows.item(i).phone;
                    var neme = r.rows.item(i).neme;
                    var adress = r.rows.item(i).adress;
                    var oplata = r.rows.item(i).oplata;
                    var time = r.rows.item(i).time;
                    var comment = r.rows.item(i).comment;
                    var price = r.rows.item(i).price;
                    table.insertAdjacentHTML('afterbegin', `<tr><td>${phone}</td><td>${neme}</td><td>${adress}</td><td>${oplata}</td><td>${time}</td><td>${comment}</td><td>${price}</td></tr>`);
                }
                }
        }
        );
    });
    document.getElementById('avatarka').innerHTML = param.get('email')[0];
    document.getElementById('nik').innerHTML = param.get('email');
}
// удаление бд
function delete_data(){
    let conf = confirm('Удалить?');
    if(conf){
        db.transaction(function (t) 
        {	
            t.executeSql('DELETE FROM METKA WHERE email=?;',[param.get('email')], OK());
        });
    }
}
// перезагрузка страницы
function OK(){
    window.location.reload();
}