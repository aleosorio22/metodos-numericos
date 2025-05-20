function resultado = gauss_seidel(A, b, x0, tol, max_iter)
    % Método de Gauss-Seidel
    % A: matriz de coeficientes
    % b: vector de constantes
    % x0: vector inicial
    % tol: tolerancia
    % max_iter: máximo de iteraciones

    n = length(b);
    x = x0;

    for k = 1:max_iter
        x_old = x;

        for i = 1:n
            suma = 0;
            for j = 1:n
                if j ~= i
                    suma = suma + A(i,j) * x(j);
                end
            end
            x(i) = (b(i) - suma) / A(i,i);
        end

        % Verificar convergencia
        if norm(x - x_old, inf) < tol
            resultado = x;
            return;
        end
    end

    resultado = x;  % Devolver resultado aunque no haya convergido completamente
end
