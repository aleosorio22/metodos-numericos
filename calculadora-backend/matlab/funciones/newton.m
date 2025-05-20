function resultado = newton(f_str, x0, tol, max_iter)
    % Método de Newton-Raphson
    % f_str: string de la función, ej: 'x^3 - x - 2'

    syms x
    f_sym = str2sym(f_str);         % ✔️ convertir string simbólico a expresión simbólica
    f = matlabFunction(f_sym);      % ✔️ convertir en función evaluable
    df = matlabFunction(diff(f_sym)); % ✔️ derivada también como función evaluable

    iter = 0;
    x_ant = x0;

    while iter < max_iter
        fx = f(x_ant);
        dfx = df(x_ant);

        if dfx == 0
            resultado = 'Error: Derivada cero. No se puede continuar.';
            return;
        end

        x_sig = x_ant - fx / dfx;

        if abs(x_sig - x_ant) < tol
            resultado = x_sig;
            return;
        end

        x_ant = x_sig;
        iter = iter + 1;
    end

    resultado = x_sig;
end
