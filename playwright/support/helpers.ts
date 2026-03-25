export function generateOrderCode() {
    const prefix = 'VLO';
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let randomPart = '';
  
    // Parte aleatória: 6 caracteres alfanuméricos
    for (let i = 0; i < 6; i++) {
      randomPart += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
  
    return `${prefix}-${randomPart}`;
}