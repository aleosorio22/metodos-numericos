function resultado = resolver_ecuacion(ecuacion_str, variable)
    % Resuelve ecuaciones algebraicas del tipo f(x) = 0
    try
        syms x y z t
        eq = str2sym(ecuacion_str);
        var = str2sym(variable);
        soluciones = solve(eq, var);

        resultado = mat2str(double(soluciones)); % convertir a arreglo numérico (si es posible)
    catch
        resultado = 'Error al resolver la ecuación';
    end
end
