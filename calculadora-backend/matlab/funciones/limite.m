function resultado = limite(f_str, variable, punto, direccion)
    % Calcula el límite de una función simbólica
    % f_str: string de la función
    % variable: variable de la función (ej. 'x')
    % punto: valor al que tiende
    % direccion: 'left', 'right' o 'both'

    try
        syms x y z t
        f = str2sym(f_str);
        var = str2sym(variable);

        switch lower(direccion)
            case 'left'
                resultado = limit(f, var, punto, 'left');
            case 'right'
                resultado = limit(f, var, punto, 'right');
            case 'both'
                resultado = limit(f, var, punto);
            otherwise
                resultado = 'Error: dirección no válida';
        end

        if isa(resultado, 'sym')
            resultado = char(resultado);  % convertir a string si es simbólico
        end
    catch
        resultado = 'Error al calcular el límite';
    end
end
