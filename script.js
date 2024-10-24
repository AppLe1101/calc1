document.addEventListener('DOMContentLoaded', function(){
    var form = document.querySelector('.calc');
    form.addEventListener('submit', function(e){
        e.preventDefault(); // предотвращаем перезагрузку страницы
    });
    
    var res_field = document.querySelector('.result_field');
    var btn_num = document.querySelectorAll('.btn-add');
    var btn_reset = document.querySelector('.btn-reset');
    var btn_eq = document.querySelector('.btn-eq');
    
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
