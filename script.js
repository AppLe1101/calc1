document.addEventListener('DOMContentLoaded', function(){
    var form = document.querySelector('.calc');
    form.addEventListener('submit', function(e){
        e.preventDefault(); // - перезагрузка страницы
    });
    
    const allBtn = document.querySelectorAll('.btn');
    var res_field = document.querySelector('.result_field');
    var btn_num = document.querySelectorAll('.btn-add');
    var btn_reset = document.querySelector('.btn-reset');
    var btn_eq = document.querySelector('.btn-eq');
    var btn_mode_toggle = document.querySelector('.btn-mode-toggle');
    const btn_adv = document.getElementById('btn_adv');
    const history = document.getElementById('history');
//смена темы
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
    
//меню
    var btn_menu = document.getElementById('btn-menu');
    btn_menu.addEventListener('click', () => {
        const isOpen = history.style.display === 'none';
        history.style.display = isOpen ? 'flex' : 'none';
    });

//скобки
    let openBrackets = 0;

    function addToExpression(value) {
        if (value === '('){
            openBrackets++; 
            res_field.value += '(';

            res_field.classList.add('open-bracket');
        } else if (value === ')' && openBrackets > 0) {
            openBrackets--;
            res_field.value += ')';

            if (openBrackets === 0) {
                res_field.classList.remove('open-bracket');
            }
        } else if (value !== ')' || openBrackets > 0){
            res_field.value += value;
        }
    }
//строка
    btn_num.forEach(button =>  {
        button.addEventListener('click', ()=>{
            const value = button.dataset.value || button.innerText;
            addToExpression(value);
        });
    });

//переключатель режимов 
    btn_mode_toggle.addEventListener('click', () => {
        const isStandart = btn_adv.style.display === 'none';
        btn_adv.style.display = isStandart ? 'flex' : 'none';

        allBtn.forEach(button => {
            button.classList.toggle('small-btn');
        });
    });
    
// Сброс поля результата
    btn_reset.addEventListener('click', function(e){
        e.preventDefault();
        res_field.value = '';
        openBrackets = 0;
        res_field.classList.remove('open-bracket');
    });
    
// Вычисление результата
    btn_eq.addEventListener('click', function(e){
        e.preventDefault();
        try {
            let expression = res_field.value;

            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            expression = expression.replace(/\^/g, '**'); // возведение в степень
            expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)'); //  корнень

            result = eval(expression);
            formattedResult = parseFloat(result.toFixed(3)).toString();
            res_field.value = formattedResult;
            openBrackets = 0;
            res_field.classList.remove('open-bracket');
            addToHistory(`${expression} = ${formattedResult}`);
        } catch (error) {
            res_field.value = 'Ошибка';
        }
    });
    function addToHistory(entry) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerText = entry;
        history.prepend(historyItem);
    }
});