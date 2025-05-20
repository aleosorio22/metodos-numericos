function resultado = secante_modificada(f_str, x0, tol, max_iter)
    % Método de Secante Modificada (una sola raíz)
    % f_str: función como string (ej. 'x^3 - x - 2')
    % x0: valor inicial
    % tol: tolerancia
    % max_iter: máximo de iteraciones

    h = 1e-5; % Paso pequeño para derivada numérica
    f = str2func(['@(x)' f_str]);

    iter = 0;
    while iter < max_iter
        fx = f(x0);
        dfx = (f(x0 + h) - f(x0 - h)) / (2 * h);  % derivada numérica central

        if dfx == 0
            resultado = 'Error: Derivada cero';
            return;
        end

        x1 = x0 - fx / dfx;

        if abs(x1 - x0) < tol
            resultado = x1;
            return;
        end

        x0 = x1;
        iter = iter + 1;
    end

    resultado = x1;
end
