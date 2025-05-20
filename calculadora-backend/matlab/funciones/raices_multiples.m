function resultado = raices_multiples(f_str, x0, tol, max_iter)
    % Método de raíces múltiples (Newton-Raphson mejorado)
    % f_str: string de la función
    % x0: valor inicial
    % tol: tolerancia
    % max_iter: máximo de iteraciones

    syms x
    f_sym = str2sym(f_str);
    f = matlabFunction(f_sym);
    df = matlabFunction(diff(f_sym));       % Primera derivada
    d2f = matlabFunction(diff(f_sym, 2));   % Segunda derivada

    iter = 0;

    while iter < max_iter
        fx = f(x0);
        dfx = df(x0);
        d2fx = d2f(x0);

        denominador = dfx^2 - fx * d2fx;

        if denominador == 0
            resultado = 'Error: División por cero';
            return;
        end

        x1 = x0 - (fx * dfx) / denominador;

        if abs(x1 - x0) < tol
            resultado = x1;
            return;
        end

        x0 = x1;
        iter = iter + 1;
    end

    resultado = x1;
end
