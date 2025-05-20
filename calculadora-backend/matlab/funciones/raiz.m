function resultado = raiz(radicando, indice)
    % Calcula la raíz n-ésima del radicando
    % radicando: número al que se le quiere sacar raíz
    % indice: orden de la raíz (2 para cuadrada, 3 para cúbica, etc.)

    if indice == 0
        resultado = 'Error: índice no puede ser cero';
        return;
    end

    try
        resultado = radicando^(1 / indice);
    catch
        resultado = 'Error al calcular la raíz';
    end
end
