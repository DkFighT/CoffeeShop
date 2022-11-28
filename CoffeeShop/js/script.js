// Запуск и остановка видео
var video = document.getElementById("myVideoPlayer");
var flag = true;
function stopVideo(){
    if(flag == true){
        video.pause();
        flag = false;
    }
    else{
        video.play();
        flag = true;
    }
}

// появление и исчезание диалогового окна
var dialog = document.querySelector('dialog');
var back = document.getElementById('back');
var noscr = document.getElementById('html');
var close_ = document.querySelectorAll('.closeDialog');

// Создание бд
var db = openDatabase('webDB', '1.0', 'Test DB', 2 * 1024 * 1024);

document.querySelector('#shoping').onclick = function () {
    dialog.show(); // Показываем диалоговое окно
    back.classList.add('back');
    noscr.classList.add('noscrl');
    open_product_list();
}
for(let i = 0; i < close_.length; i++)
    close_[i].onclick = function () {
    dialog.close(); // Прячем диалоговое окно
    back.classList.remove('back');
    noscr.classList.remove('noscrl');
    remove_product_list();
}

// меню и цены
var names = ['Amerekano', 'Latte', 'Capuchino', 'Mokko', 'Raf', 'Espresso', 'Double espresso', 'Cacao', 'Frape', 'Tea'];
var prices = [8, 12, 12, 10, 12, 8, 10, 6, 12, 6];

// количество товаров в корзине
var nums = document.querySelector('.num_in_bin');
const num_in_bin = () =>
{
    window.addEventListener('click', (ev) =>{
        let a = 0;
        for(let i = 0; i < document.forms.length - 1; i++)
        {
            a += Number(document.forms[i].out.value);
        };
        nums.innerHTML = a;
    });
}
num_in_bin();

var num_products_in_bin = 0;
// функция генерации продукт листа
function open_product_list()
{
    let total_price = 0;
    var listOfProducts = document.getElementById('list-of-products');
    for(let i = 0; i < document.forms.length - 1; i++)
    {
        if(document.forms[i].out.value > 0)
        {
            document.getElementById('empty_cart').classList.add('empty');
            let coffee = document.forms[i].out.value;
            listOfProducts.insertAdjacentHTML('afterbegin', `<div class="list-product font_size_20" id="${num_products_in_bin}"><span>${coffee} x ${names[i]}</span><span>${coffee * prices[i]}.00$</span></div>`);
            num_products_in_bin += 1;
            total_price += coffee * prices[i];
        }
    }
    document.getElementById('total-price').innerHTML = total_price + '.00$';
    return total_price;
}

// функция очищения продукт листа
function remove_product_list()
{
    for(let i = 0; i < num_products_in_bin; i++)
    {
        let el = document.getElementById(`${i}`);
        el.remove();
    }
    num_products_in_bin = 0;
    document.getElementById('total-price').innerHTML = 0 + '.00$';

    document.getElementById('empty_cart').classList.remove('empty');
}
// функция проверки пуста ли корзина и тут же создание новой строки в таблице
function create_value(iform){
    if(open_product_list() == 0){
        alert('Cart is empty!')
        return false;
    }
    else{
        // создание нового поля в таблице для бд
        let email = iform.mail.value;
        let phone = iform.phone.value;
        let neme = iform.fio.value;
        let adress = iform.adress.value;
        let oplata = iform.oplata.value;
        let time = iform.delivery.value;
        let comment = iform.comment.value;
        let price = document.getElementById('total-price').textContent;

        insertData(db, email, phone, neme, adress, oplata, time, comment, price);
        dateView(db);
        OK();

        alert('Thx for order');
        return true;
    }
}

// плавный скрол
function smoothScrl(){
    // все ссылки которые начинаются с решетки
const smoothLinks = document.querySelectorAll('a[href^="#"]'); 
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        // если событие не выполняется, действие элемента по умолчанию
        e.preventDefault();
        // получаю ссылку
        const id = smoothLink.getAttribute('href');
        // скролю до элемента пока не увидит элемент
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};}
smoothScrl();

// функция для навигационого меню
function active_menu(el){
    let id = document.getElementById(el);
    var actives = document.querySelectorAll('.actives');
    // обнуление классов
    for(let i = 0; i < actives.length; i++){
        actives[i].classList.remove('actives');
        actives[i].classList.add('not_active');
    }
    id.classList.add('actives');
    id.classList.remove('not_active');
}

// Создание поля с вводом номера карты
function createNewField(){
    var sel = document.getElementById('sel');
    if(document.iform.oplata.value == 'Картой'){
        sel.insertAdjacentHTML('afterend', `<div class="input_group oplata_card"><input class="font_size_20" type="text" name="oplata_card" id="adress" required pattern="[0-9]{16}"><label>Card number<span>*</span></label></div>`);
    }
    else{
        let card = document.querySelectorAll('.oplata_card');
        for(let i = 0; i < card.length; i++)
            card[i].remove();
    }
}

// Создание таблицы
function createTable(db) { 
    db.transaction(function (t) { 
        t.executeSql("CREATE TABLE METKA(email TEXT, phone TEXT, neme TEXT, adress TEXT, oplata TEXT, time TEXT, comment TEXT, price TEXT)", []); 
    });
}
// Заполнение строки
createTable(db);
function insertData(db, email, phone, neme, adress, oplata, time, comment, price) {
    db.transaction(function (e) { 
        e.executeSql("INSERT INTO METKA(email, phone, neme, adress, oplata, time, comment, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [email, phone, neme, adress, oplata, time, comment, price]); 
    }); 
}
function OK(){
    window.location.reload();
}
// Вывод данных
function dateView(db){
    let table = document.getElementById('tbody');
    db.transaction(function (t) { 
        t.executeSql("SELECT * FROM METKA", [], 
        function (tran, r) {
            for (let i = 0; i < r.rows.length; i++) {
                var email = r.rows.item(i).email;
                var phone = r.rows.item(i).phone;
                var neme = r.rows.item(i).neme;
                var adress = r.rows.item(i).adress;
                var oplata = r.rows.item(i).oplata;
                var time = r.rows.item(i).time;
                var comment = r.rows.item(i).comment;
                var price = r.rows.item(i).price;
                table.insertAdjacentHTML('afterbegin', `<tr><td>${neme}</td><td>${oplata}</td><td>${time}</td><td>${price}</td></tr>`);
            }
        }
        );
    });

}
