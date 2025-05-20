function resultado = logaritmo(valor, base)
    % Calcula logaritmo en base específica
    % valor: número positivo
    % base: puede ser 'e', 10 o cualquier valor positivo distinto de 1

    if valor <= 0
        resultado = 'Error: El valor debe ser mayor a 0';
        return;
    end

    if base == 'e'
        resultado = log(valor); % log natural
    elseif base == 10
        resultado = log10(valor);
    elseif base > 0 && base ~= 1
        resultado = log(valor) / log(base);
    else
        resultado = 'Error: Base inválida';
    end
end
