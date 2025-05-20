function resultado = cramer(A, b)
    % Regla de Cramer para resolver sistemas lineales Ax = b
    A = double(A);
    b = double(b(:)); % asegurar vector columna
    n = length(b);

    detA = det(A);
    if detA == 0
        resultado = 'Error: La matriz no tiene solución única (det = 0)';
        return;
    end

    x = zeros(n, 1);
    for i = 1:n
        Ai = A;
        Ai(:, i) = b;  % Reemplaza la columna i por b
        x(i) = det(Ai) / detA;
    end

    resultado = mat2str(x);
end
