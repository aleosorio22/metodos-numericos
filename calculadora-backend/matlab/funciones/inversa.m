function resultado = inversa(A, b)
    % Método de la matriz inversa para resolver Ax = b
    % A: matriz de coeficientes
    % b: vector de constantes

    A = double(A);
    b = double(b(:)); % asegurar vector columna

    if det(A) == 0
        resultado = 'Error: La matriz no es invertible';
        return;
    end

    x = inv(A) * b;
    resultado = mat2str(x);
end
