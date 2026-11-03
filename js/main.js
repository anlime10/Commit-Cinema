/**
 * COMMIT CINEMA - INTERACTIVIDAD BÁSICA (VERSIÓN NAVIDAD)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎄 ¡Bienvenido a Commit Cinema - Edición Especial de Navidad! 🎅', 
        'color: #c62828; font-size: 16px; font-weight: bold; background: #0b131b; padding: 8px 12px; border-radius: 4px;');

    // Configuración actual de temporada (actualizada en P17 mediante cherry-pick)
    const APP_CONFIG = {
        season: 'NAVIDAD',
        activeDiscountCode: 'NAVIDAD2026',
        discountPercentage: 25
    };

    // Selección interactiva de sesiones de cine
    const sessionButtons = document.querySelectorAll('.session-chips .chip');
    sessionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const parent = e.target.closest('.session-chips');
            parent.querySelectorAll('.chip').forEach(btn => {
                btn.style.background = '';
                btn.style.color = '';
            });
            e.target.style.background = 'var(--theme-color-primary)';
            e.target.style.color = '#ffffff';
        });
    });

    // Acción de reserva de entradas
    const reserveButtons = document.querySelectorAll('.btn-ticket');
    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.movie-card');
            const title = card.querySelector('.movie-title').textContent;
            alert(`🎄 ¡Reserva iniciada para "${title}"!\nAplica el código ${APP_CONFIG.activeDiscountCode} para un ${APP_CONFIG.discountPercentage}% de descuento navideño especial.`);
        });
    });
});
