function resultado = muller(f_str, x0, x1, x2, tol, max_iter)
    % Método de Müller para encontrar raíces (reales o complejas)
    % f_str: string de la función, ej. 'x^3 - x - 2'
    % x0, x1, x2: valores iniciales
    % tol: tolerancia
    % max_iter: máximo de iteraciones

    syms x
    f = matlabFunction(str2sym(f_str));

    iter = 0;

    while iter < max_iter
        h1 = x1 - x0;
        h2 = x2 - x1;
        d1 = (f(x1) - f(x0)) / h1;
        d2 = (f(x2) - f(x1)) / h2;

        a = (d2 - d1) / (h2 + h1);
        b = a * h2 + d2;
        c = f(x2);

        rad = sqrt(b^2 - 4 * a * c);

        if abs(b + rad) > abs(b - rad)
            den = b + rad;
        else
            den = b - rad;
        end

        if den == 0
            resultado = 'Error: División por cero';
            return;
        end

        dxr = -2 * c / den;
        xr = x2 + dxr;

        if abs(dxr) < tol
            resultado = xr;
            return;
        end

        % Desplazamiento para nueva iteración
        x0 = x1;
        x1 = x2;
        x2 = xr;

        iter = iter + 1;
    end

    resultado = xr;
end
