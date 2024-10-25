document.addEventListener('DOMContentLoaded', function(){
    var form = document.querySelector('.calc');
    form.addEventListener('submit', function(e){
        e.preventDefault(); // - перезагрузка страницы
    });
    
    var res_field = document.querySelector('.result_field');
    var btn_num = document.querySelectorAll('.btn-add');
    var btn_reset = document.querySelector('.btn-reset');
    var btn_eq = document.querySelector('.btn-eq');
    const theme = document.querySelector('#theme-link');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        theme.href = savedTheme;
    }
    document.getElementById('theme-toggle').addEventListener('click', function(){
        if (theme.getAttribute('href') == 'css/styles.css') {
            theme.href = 'css/night-theme.css';
            localStorage.setItem('theme', 'css/night-theme.css');
        } else {
            theme.href = 'css/styles.css';
            localStorage.setItem('theme', 'css/styles.css');
        }
    });
    
    for (var i = 0; i < btn_num.length; i++) {
        btn_num[i].addEventListener('click', function(e){
            e.preventDefault();
            res_field.value += this.innerHTML; 
        });
    }
    
    // Сброс поля результата
    btn_reset.addEventListener('click', function(e){
        e.preventDefault();
        res_field.value = '';
    });
    
    // Вычисление результата
    btn_eq.addEventListener('click', function(e){
        e.preventDefault();
        try {
            let expression = res_field.value;
            

            expression = expression.replace(/\^/g, '**'); // возведения в степень
            expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)'); // замена корня
            

            res_field.value = eval(expression);
        } catch (error) {
            res_field.value = 'Ошибка';
        }
    });
});
