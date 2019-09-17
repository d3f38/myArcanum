window.onload = () => {
    document.body.addEventListener('click', event => {
        const containClass = selector => event.target.classList.contains(selector);
        
        if (containClass('onoffswitch') || containClass('onoffswitch__button')) {
            const blocksWithTheme = [...document.querySelectorAll('.theme_color_project-default, .theme_color_project-inverse')];
    
            document.querySelector('.onoffswitch__button').classList.toggle('onoffswitch__button_active');
            blocksWithTheme.forEach(block => {
                block.classList.toggle('theme_color_project-inverse');
                block.classList.toggle('theme_color_project-default');
            });
        }
    
        const blocksFromHistory = [...document.querySelectorAll('.history__transaction, .history__transaction div')];
    
        if (blocksFromHistory.includes(event.target)) {
            const historyTransaction = event.target.closest('.history__transaction');
            const historyHidden = historyTransaction.querySelector('.history__hide');
            historyHidden.classList.toggle('history__hide_visible');
        }
    });
}
