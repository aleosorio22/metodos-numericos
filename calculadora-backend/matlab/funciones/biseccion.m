function resultado = biseccion(f_str, a, b, tol, max_iter)
    % Método de Bisección para encontrar raíces
    % f_str: función como string, ej: 'x^3 - x - 2'
    % a, b: intervalo inicial
    % tol: tolerancia
    % max_iter: número máximo de iteraciones

    syms x
    f = str2func(['@(x)' f_str]);

    if f(a) * f(b) >= 0
        resultado = 'Error: f(a) y f(b) deben tener signos opuestos';
        return;
    end

    iter = 0;
    while (b - a)/2 > tol && iter < max_iter
        c = (a + b)/2;
        if f(c) == 0
            break;
        elseif f(a) * f(c) < 0
            b = c;
        else
            a = c;
        end
        iter = iter + 1;
    end

    resultado = c; % raíz aproximada
end
