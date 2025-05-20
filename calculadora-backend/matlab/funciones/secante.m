function resultado = secante(f_str, x0, x1, tol, max_iter)
    % Método de la Secante
    % f_str: función como string (ej. 'x^3 - x - 2')
    % x0, x1: valores iniciales
    % tol: tolerancia
    % max_iter: iteraciones máximas

    f = str2func(['@(x)' f_str]);

    iter = 0;
    while iter < max_iter
        f0 = f(x0);
        f1 = f(x1);

        if f1 - f0 == 0
            resultado = 'Error: División por cero en la secante';
            return;
        end

        x2 = x1 - f1 * (x1 - x0) / (f1 - f0);

        if abs(x2 - x1) < tol
            resultado = x2;
            return;
        end

        x0 = x1;
        x1 = x2;
        iter = iter + 1;
    end

    resultado = x2;
end
