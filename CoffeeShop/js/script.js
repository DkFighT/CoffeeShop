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
    var total_price = 0;
    var listOfProducts = document.getElementById('list-of-products');
    for(let i = 0; i < document.forms.length - 1; i++)
    {
        if(document.forms[i].out.value > 0)
        {
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
}

function create_value(iform){
    if(open_product_list() == 0){
        alert('Cart is empty!')
        return false;
    }
    else{
        // создание нового поля в таблицы для бд

        return true;
    }
}

function smoothScrl(){
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};}
smoothScrl();