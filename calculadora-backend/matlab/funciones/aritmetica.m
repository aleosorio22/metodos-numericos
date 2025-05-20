function resultado = aritmetica(a, b, operacion)
    % Calculadora aritmética básica
    switch lower(operacion)
        case 'suma'
            resultado = a + b;
        case 'resta'
            resultado = a - b;
        case 'multiplicacion'
            resultado = a * b;
        case 'division'
            if b == 0
                resultado = 'Error: División por cero';
            else
                resultado = a / b;
            end
        otherwise
            resultado = 'Error: Operación no válida';
    end
end
