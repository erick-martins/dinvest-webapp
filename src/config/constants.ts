/* eslint-disable no-control-regex */

// Validação usando o formato RFC 5322
export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Validação de senha de 8 letras, com pelo menos um símbolo, letras maiúsculas e minúsculas e um número
export const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
