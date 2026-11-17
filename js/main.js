/**
 * COMMIT CINEMA - INTERACTIVIDAD BÁSICA (VERSIÓN HALLOWEEN)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎃 ¡Bienvenido a Commit Cinema - Edición Especial Halloween! 🦇', 
        'color: #ff6f00; font-size: 16px; font-weight: bold; background: #120e1c; padding: 8px 12px; border-radius: 4px;');

    // Configuración actual de temporada
    const APP_CONFIG = {
        season: 'HALLOWEEN',
        activeDiscountCode: 'NAVIDAD2026',
        discountPercentage: 15
    };

    // Selección interactiva de sesiones de cine
    const sessionButtons = document.querySelectorAll('.session-chips .chip');
    sessionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const parent = e.target.closest('.session-chips');
            parent.querySelectorAll('.chip').forEach(btn => btn.style.background = '');
            e.target.style.background = 'var(--theme-color-primary)';
            e.target.style.color = '#000000';
        });
    });

    // Acción de reserva de entradas
    const reserveButtons = document.querySelectorAll('.btn-ticket');
    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.movie-card');
            const title = card.querySelector('.movie-title').textContent;
            alert(`🎃 ¡Reserva iniciada para "${title}"!\nAplica el código ${APP_CONFIG.activeDiscountCode} para un ${APP_CONFIG.discountPercentage}% de descuento terrorífico.`);
        });
    });
});
