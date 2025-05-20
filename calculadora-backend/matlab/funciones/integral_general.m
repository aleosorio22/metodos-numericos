function resultado = integral_general(f_str, variable, a, b, tipo)
    % Calcula integrales definidas, indefinidas, áreas o volúmenes
    % tipo: 'integral', 'area', 'volumen', 'indefinida'

    try
        syms x y z t
        f = str2sym(f_str);
        var = str2sym(variable);

        switch lower(tipo)
            case 'indefinida'
                resultado = int(f, var);
            case 'integral'
                resultado = int(f, var, a, b);
            case 'area'
                resultado = int(abs(f), var, a, b);
            case 'volumen'
                resultado = pi * int(f^2, var, a, b);
            otherwise
                resultado = 'Error: tipo no válido';
        end

        if isa(resultado, 'sym')
            resultado = char(resultado);
        end
    catch
        resultado = 'Error al calcular la integral';
    end
end
