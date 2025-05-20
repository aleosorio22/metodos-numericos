function resultado = gauss_simple(A, b)
    % Método de eliminación de Gauss sin pivoteo
    % A: matriz de coeficientes
    % b: vector de constantes
    % Retorna vector solución x

    A = double(A);
    b = double(b);
    n = length(b);
    Ab = [A b(:)];  % b(:) convierte a vector columna


    % Eliminación
    for k = 1:n-1
        for i = k+1:n
            if Ab(k,k) == 0
                resultado = 'Error: pivote cero';
                return;
            end
            factor = Ab(i,k) / Ab(k,k);
            Ab(i,k:end) = Ab(i,k:end) - factor * Ab(k,k:end);
        end
    end

    % Sustitución hacia atrás
    x = zeros(n, 1);
    for i = n:-1:1
        x(i) = (Ab(i,end) - Ab(i,i+1:n) * x(i+1:n)) / Ab(i,i);
    end

    resultado = mat2str(x);

end
