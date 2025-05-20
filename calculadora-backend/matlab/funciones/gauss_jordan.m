 function resultado = gauss_jordan(A, b)
    % Método de Gauss-Jordan para resolver sistemas lineales
    % A: matriz de coeficientes
    % b: vector de constantes

    A = double(A);
    b = double(b(:)); % asegurar vector columna
    n = length(b);
    Ab = [A b];

    for i = 1:n
        % Pivoteo parcial (si el pivote es 0)
        if Ab(i,i) == 0
            for j = i+1:n
                if Ab(j,i) ~= 0
                    Ab([i j], :) = Ab([j i], :);
                    break;
                end
            end
        end

        % Hacer el pivote igual a 1
        Ab(i,:) = Ab(i,:) / Ab(i,i);

        % Hacer ceros en la columna actual (excepto en la fila i)
        for j = 1:n
            if j ~= i
                Ab(j,:) = Ab(j,:) - Ab(j,i) * Ab(i,:);
            end
        end
    end

    x = Ab(:, end); % última columna es la solución
    resultado = mat2str(x); % devolver como string limpio
end
