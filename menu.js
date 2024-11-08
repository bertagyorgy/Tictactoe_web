function openMenu(menuId) {
    // Elrejti az alapmenü elemeit
    document.querySelector('.menu-buttons').style.display = 'none';
    
    // Megjeleníti az adott almenüt
    document.getElementById(menuId).style.display = 'block';
}

function closeMenu() {
    // Visszahozza az alapmenü elemeit
    document.querySelector('.menu-buttons').style.display = 'block';
    
    // Elrejti az összes almenüt
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.style.display = 'none';
    });
}
