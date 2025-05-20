function resultado = trigonometria(valor, unidad, operacion)
    % Funciones trigonométricas básicas
    % valor: ángulo (en grados o radianes)
    % unidad: 'grados' o 'radianes'
    % operacion: 'seno', 'coseno', 'tangente'

    if strcmpi(unidad, 'grados')
        valor = deg2rad(valor);
    elseif ~strcmpi(unidad, 'radianes')
        resultado = 'Error: unidad no válida';
        return;
    end

    switch lower(operacion)
        case 'seno'
            resultado = sin(valor);
        case 'coseno'
            resultado = cos(valor);
        case 'tangente'
            resultado = tan(valor);
        otherwise
            resultado = 'Error: operación no válida';
    end
end
