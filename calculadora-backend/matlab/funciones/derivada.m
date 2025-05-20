function resultado = derivada(f_str, variable, orden)
    % Calcula la derivada de orden n de una función simbólica
    % f_str: string de la función (ej. 'x^3 - 2*x + 1')
    % variable: variable de derivación (ej. 'x')
    % orden: orden de derivada (entero positivo)

    try
        syms x y z t  % Define variables comunes
        f_sym = str2sym(f_str);
        var = str2sym(variable);
        derivada = diff(f_sym, var, orden);
        resultado = char(derivada);  % Convertir a string para retorno
    catch
        resultado = 'Error al calcular la derivada';
    end
end
