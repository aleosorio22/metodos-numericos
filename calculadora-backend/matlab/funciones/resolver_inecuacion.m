function resultado = resolver_inecuacion(ineq_str, variable)
    % Resuelve inecuaciones simbólicas
    try
        syms x y z t
        ineq = str2sym(ineq_str);
        var = str2sym(variable);
        sol = solve(ineq, var, 'ReturnConditions', true);

        if isempty(sol.conditions)
            resultado = 'No hay solución';
        else
            resultado = char(sol.conditions);  % expresión lógica simbólica
        end
    catch
        resultado = 'Error al resolver la inecuación';
    end
end
